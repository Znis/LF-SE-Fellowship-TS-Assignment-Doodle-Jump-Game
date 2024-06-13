import Doodler from "./components/doodler";
import Point from "./shapes/point";
import { draw } from "./main";
import {
  DIMENSIONS,
  DOODLER_HEIGHT,
  DOODLER_WIDTH,
  PLATFORM_HEIGHT,
  PLATFORM_WIDTH,
  MAX_PLATFORM_SPACING,
  MIN_PLATFORM_SPACING,
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
import { drawGamePause } from "./canvas";

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
  const minPlatformGap = 50;
  const maxPlatformGap = 150;
  const minClusterHeight = 100;
  const maxClusterHeight = 200;
  const minGapBetweenClusters = 50;
  const maxGapBetweenClusters = 100;
  while (ymax > 0) {
    let clusterHeight =
      minClusterHeight + getRandomInt(minClusterHeight, maxClusterHeight);
    let clusterEnd = ymax - clusterHeight;
    while (ymax > clusterEnd && ymax > 0) {
      const platform: Platform = new Platform(
        new Point(
          getRandomInt(0, DIMENSIONS.CANVAS_WIDTH - PLATFORM_WIDTH),
          ymax
        ),
        PLATFORM_HEIGHT,
        PLATFORM_WIDTH,
        "./assets/images/platform.png"
      );
      stateVariables.platformArray.push(platform);

      ymax -=
        minPlatformGap + Math.random() * (maxPlatformGap - minPlatformGap);
    }
    ymax -=
      minGapBetweenClusters +
      Math.random() * (maxGapBetweenClusters - minGapBetweenClusters);
  }
}

export function generateRandomPlatform() {
  const platform: Platform = new Platform(
    new Point(getRandomInt(0, DIMENSIONS.CANVAS_WIDTH - PLATFORM_WIDTH), 0),
    PLATFORM_HEIGHT,
    PLATFORM_WIDTH,
    "./assets/images/platform.png"
  );
  stateVariables.platformArray.unshift(platform);

}

export function moveRandomPlatforms() {
  if(doodlerState.distanceFromGround > 2 * DIMENSIONS.CANVAS_HEIGHT){
    stateVariables.platformArray.forEach((platform) => {
      platform.movePlatform();
    });
  }
  
}

export function updateCameraPosition(): void {
  const dy = stateVariables.doodler.startPoint.y - DIMENSIONS.CANVAS_HEIGHT / 2;
  stateVariables.doodler.startPoint.y -= dy;
  doodlerState.distanceFromGround += Math.abs(dy);
  if (
    stateVariables.platformArray[0].startPoint.y >
    getRandomInt(MIN_PLATFORM_SPACING, MAX_PLATFORM_SPACING)
  ) {
    generateRandomPlatform();
  }

  stateVariables.platformArray.forEach((element) => {
    element.startPoint.y -= dy;
  });
  doodlerState.currentPlatform.startPoint.y -= dy;
}

export function collisionDetection(doodler: Doodler, platform: Platform) {
  return (
    doodler.startPoint.x < platform.startPoint.x + platform.w &&
    doodler.startPoint.x + doodler.w > platform.startPoint.x &&
    doodler.startPoint.y < platform.startPoint.y + platform.h &&
    doodler.startPoint.y + doodler.h > platform.startPoint.y
  );
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
      stateVariables.score++;
      stateVariables.highScore = Math.max(stateVariables.highScore, stateVariables.score);
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
console.log(stateVariables.doodler.startPoint.y)
  doodlerState.onPlatform =
    stateVariables.doodler.startPoint.x <
      doodlerState.currentPlatform.startPoint.x +
        doodlerState.currentPlatform.w &&
    stateVariables.doodler.startPoint.x + stateVariables.doodler.w >
      doodlerState.currentPlatform.startPoint.x && doodlerState.currentPlatform.startPoint.y <= DIMENSIONS.CANVAS_HEIGHT;



  if(stateVariables.doodler.startPoint.y  >= DIMENSIONS.CANVAS_HEIGHT){
   gameOver();
  }
  if (
    stateVariables.doodler.startPoint.y < DIMENSIONS.CANVAS_HEIGHT / 2 &&
    doodlerState.onPlatform
  ) {
    doodlerState.distanceFromGround += DIMENSIONS.CANVAS_WIDTH / 2;

    updateCameraPosition();
  }
}
export function goRight(): void {
  const doodlerTopLeftX = stateVariables.doodler.startPoint.x;
  if (doodlerTopLeftX > DIMENSIONS.CANVAS_WIDTH) {
    stateVariables.doodler.startPoint.x = 0;
  } else {
    stateVariables.doodler.startPoint.x += SPEED_X;
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
    stateVariables.doodler.startPoint.x -= SPEED_X;
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
  stateVariables.platformArray = [];
  stateVariables.gameState = GameState.initialisation;
  initialiseGame();

}