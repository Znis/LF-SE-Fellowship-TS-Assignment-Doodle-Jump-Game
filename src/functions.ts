import Doodler from "./components/doodler";
import Point from "./shapes/point";
import { draw } from "./main";
import {
  DIMENSIONS,
  DOODLER_HEIGHT,
  DOODLER_WIDTH,
  PLATFORM_HEIGHT,
  PLATFORM_WIDTH,
  SPEED_Y,
  SPEED_X,
} from "./constants";
import {
  Direction,
  doodlerState,
  stateVariables,
  GameState,
} from "./state-variables";
import Platform from "./components/platform";
import { getRandomInt } from "./utils";
import { drawGameOver, drawGamePause } from "./canvas";

export function initialiseDoodler(): void {
  stateVariables.doodler = new Doodler(
    new Point(
      DIMENSIONS.CANVAS_WIDTH / 2 - DOODLER_WIDTH,
      DIMENSIONS.CANVAS_HEIGHT - DOODLER_HEIGHT
    ),
    DOODLER_HEIGHT,
    DOODLER_WIDTH,
    Direction.right
  );
}

export function generateInitialPlatforms(): void {
  let ymax = DIMENSIONS.CANVAS_HEIGHT - 50;
    while (ymax > 0) {
    let randomX = Math.floor((DIMENSIONS.CANVAS_WIDTH - PLATFORM_WIDTH)*3/4);
      const platform: Platform = new Platform(
        new Point(
          getRandomInt(0, randomX),
          ymax
        ),
        PLATFORM_HEIGHT,
        PLATFORM_WIDTH,
        "./assets/images/platform.png"
      );
      stateVariables.platformArray.push(platform);

      ymax -= 50;
    }

}

export function generateRandomPlatform() {
    let randomX = Math.floor((DIMENSIONS.CANVAS_WIDTH - PLATFORM_WIDTH)*4/5);
  const platform: Platform = new Platform(
    new Point(getRandomInt(0, randomX), 0),
    PLATFORM_HEIGHT,
    PLATFORM_WIDTH,
    "./assets/images/platform.png"
  );

  stateVariables.platformArray.unshift(platform);

}

export function moveRandomPlatforms() {
    console.log(doodlerState.distanceFromGround)
  if(doodlerState.distanceFromGround > DIMENSIONS.CANVAS_HEIGHT){
    stateVariables.platformArray.forEach((platform) => {
      platform.movePlatform();
    });
  }
  
}

export function updateCameraPosition(): void {
  const dy = stateVariables.doodler.startPoint.y - DIMENSIONS.CANVAS_HEIGHT / 2;
 
  if(dy < 0){
  stateVariables.doodler.startPoint.y -= dy;
  stateVariables.platformArray.forEach((element) => {
    element.startPoint.y -= dy;
  });
  doodlerState.currentPlatform.startPoint.y -= dy;
  if (
    stateVariables.platformArray[0].startPoint.y >
    50
  ) {
    
    generateRandomPlatform();
    stateVariables.score++;
    stateVariables.highScore = Math.max(stateVariables.highScore, stateVariables.score);
    doodlerState.distanceFromGround += 50;
  }


}
}

export function collisionDetection(doodler: Doodler, platform: Platform) {
  return (
    doodler.startPoint.x < platform.startPoint.x + platform.w &&
    doodler.startPoint.x + doodler.w > platform.startPoint.x &&
    doodler.startPoint.y < platform.startPoint.y + platform.h &&
    doodler.startPoint.y + doodler.h > platform.startPoint.y
  );
}


export function moveDoodler(): void{
stateVariables.doodler.startPoint.x += doodlerState.dx;
if(doodlerState.dx > 0) doodlerState.dx -= 0.4; 
if(doodlerState.dx < 0) doodlerState.dx += 0.4; 
}

export function checkAndHandleCollision() {
  stateVariables.platformArray.forEach((platform) => {
    if (
      collisionDetection(stateVariables.doodler, platform) &&
      doodlerState.dy >= 0
    ) {
      stateVariables.doodler.startPoint.y =
        platform.startPoint.y - stateVariables.doodler.h;
      doodlerState.currentPlatform = platform;
      doodlerState.onPlatform = true;
      doodlerState.onGround = false;
      doodlerState.dy = -SPEED_Y;

    }
  });
}

export function handleJump(): void {
  doodlerState.dy += doodlerState.gravity;
  stateVariables.doodler.startPoint.y += doodlerState.dy;
  if (
    stateVariables.doodler.startPoint.y >=
    DIMENSIONS.CANVAS_HEIGHT - stateVariables.doodler.h && doodlerState.onGround
  ) {
    doodlerState.dy = -SPEED_Y;
  }

  doodlerState.onPlatform =
    stateVariables.doodler.startPoint.x <
      doodlerState.currentPlatform.startPoint.x +
        doodlerState.currentPlatform.w &&
    stateVariables.doodler.startPoint.x + stateVariables.doodler.w >
      doodlerState.currentPlatform.startPoint.x && doodlerState.currentPlatform.startPoint.y <= DIMENSIONS.CANVAS_HEIGHT;



  if(stateVariables.doodler.startPoint.y+stateVariables.doodler.h-doodlerState.gravity*2 >= DIMENSIONS.CANVAS_HEIGHT){
   gameOver();
  }
  if (
    stateVariables.doodler.startPoint.y < DIMENSIONS.CANVAS_HEIGHT / 2 &&
    doodlerState.onPlatform
  ) {
    

  }
}
export function goRight(): void {
  const doodlerTopLeftX = stateVariables.doodler.startPoint.x;
  if (doodlerTopLeftX > DIMENSIONS.CANVAS_WIDTH) {
    stateVariables.doodler.startPoint.x = 0;
  } else {
    doodlerState.dx = SPEED_X;
  }
  doodlerState.doodlerDir = Direction.right;
  stateVariables.doodler.updateDoodler();
}
export function goLeft(): void {
  const doodlerBottomRightX =
    stateVariables.doodler.startPoint.x + stateVariables.doodler.w;
  if (doodlerBottomRightX < 0) {
    stateVariables.doodler.startPoint.x =
      DIMENSIONS.CANVAS_WIDTH - stateVariables.doodler.w;
  } else {
    doodlerState.dx = -SPEED_X;
    
  }
  doodlerState.doodlerDir = Direction.left;
  stateVariables.doodler.updateDoodler();
}

export function initialiseGame() {
  stateVariables.gameState = GameState.initialisation;
  initialiseDoodler();
  generateInitialPlatforms();
  requestAnimationFrame(draw);
}
export function startGame() {
  stateVariables.gameState = GameState.running;
}

export function gameOver() {
  stateVariables.gameState = GameState.gameOver;

}
export function gameOverAnimation(){


    if (doodlerState.fallDistance > 0) {
        const dy = stateVariables.doodler.startPoint.y - DIMENSIONS.CANVAS_HEIGHT / 2;
        stateVariables.platformArray.forEach((element) => {
            element.startPoint.y -= dy;
          });
          doodlerState.currentPlatform.startPoint.y -= dy;
        stateVariables.doodler.startPoint.y -= dy;
        stateVariables.doodler.startPoint.y +=5;
        doodlerState.fallDistance -= 5;
      }else{

        stateVariables.gameOverTransition > 0 ? drawGameOver(stateVariables.gameOverTransition -= 4): drawGameOver(0);
        if(stateVariables.doodler.startPoint.y < DIMENSIONS.CANVAS_HEIGHT){
            stateVariables.doodler.startPoint.y += 4;
            
        }
      
      }

}

export function pauseGame() {
  if (stateVariables.gameState == GameState.running) {
    stateVariables.gameState = GameState.paused;
    cancelAnimationFrame(stateVariables.reqAnimFrame);
    drawGamePause();
  }
}
export function resumeGame() {
  if (stateVariables.gameState == GameState.paused) {
    stateVariables.gameState = GameState.running;
    requestAnimationFrame(draw);
  }
}
export function restartGame() {
  stateVariables.score = 0;
  doodlerState.currentPlatform = new Platform(new Point(0,DIMENSIONS.CANVAS_HEIGHT),10,DIMENSIONS.CANVAS_WIDTH,'');
  doodlerState.distanceFromGround = 0;
  doodlerState.onPlatform = false;
  doodlerState.onGround = true;
  doodlerState.dx = 0;
  doodlerState.dy = 0;
  doodlerState.fallDistance = 400;
  stateVariables.gameOverTransition = 150;
  stateVariables.platformArray = [];
  stateVariables.gameState = GameState.initialisation;
  initialiseGame();

}