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
  POWER_WIDTH,
  POWER_HEIGHT,
  MIN_PLATFORM_SPACING,
  MAX_PLATFORM_SPACING,
  X_DIR_VELOCITY_DAMPENING,
  JETPACK_DURATION,
} from "./constants";
import {
  Direction,
  doodlerState,
  stateVariables,
  GameState,
  PlatformType,
} from "./state-variables";
import Platform from "./components/platform";
import { getRandomInt } from "./utils";
import { drawGameOver, drawGamePause } from "./canvas";
import Power from "./components/power";

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
  let ymax = DIMENSIONS.CANVAS_HEIGHT - MIN_PLATFORM_SPACING;
  while (ymax > 0) {
    let randomX = Math.floor(
      Math.random() * (DIMENSIONS.CANVAS_WIDTH - PLATFORM_WIDTH)
    );
    const platform: Platform = new Platform(
      new Point(getRandomInt(0, randomX), ymax),
      PLATFORM_HEIGHT,
      PLATFORM_WIDTH,
      "./assets/images/platform.png"
    );
    stateVariables.platformArray.push(platform);

    ymax -= getRandomInt(MIN_PLATFORM_SPACING, MAX_PLATFORM_SPACING);
  }
}

//function that generates new platform when Doodler moves up
export function generateRandomPlatform() {
  let randomX = Math.floor(
    Math.random() * (DIMENSIONS.CANVAS_WIDTH - PLATFORM_WIDTH)
  );
  //function that generates the power (Jetpack)
  generateRandomPower(randomX);
  const platform: Platform = new Platform(
    new Point(randomX, 0),
    PLATFORM_HEIGHT,
    PLATFORM_WIDTH,
    "./assets/images/platform.png"
  );

  stateVariables.platformArray.unshift(platform);
}


export function generateRandomPower(randomX: number){
  if (Math.random() < 0.04) { //4% chance that the the Jetpack spawns
    const power: Power = new Power(
      new Point(randomX, -POWER_HEIGHT),
      POWER_WIDTH,
      POWER_HEIGHT,
      "./assets/images/jetpack.png"
    );
    stateVariables.powerArray.push(power);
  }
}

//move the platform if it is movable
export function moveRandomPlatforms() {
  if (doodlerState.distanceFromGround > DIMENSIONS.CANVAS_HEIGHT) {
    stateVariables.platformArray.forEach((platform) => {
      platform.movePlatform();
    });
  }
}

//function that updates the canvas elements position as Doodler moves upward (like a camera movement effect following Doodler)
//it also spawn the new tiles as Doodler moves up
export function updateCameraPosition(): void {
  const dy = stateVariables.doodler.startPoint.y - DIMENSIONS.CANVAS_HEIGHT / 2;

  if (dy < 0) {
    stateVariables.doodler.startPoint.y -= dy;
    stateVariables.platformArray.forEach((platform) => {
      platform.startPoint.y -= dy;
    });
    stateVariables.powerArray.forEach((power) => {
      power.startPoint.y -= dy;
    });
  spawnTheNewPlatform();
  }
}

//spawn the random platform generated
export function spawnTheNewPlatform(){
  if (
    stateVariables.platformArray[0].startPoint.y >
    getRandomInt(MIN_PLATFORM_SPACING, MAX_PLATFORM_SPACING)
  ) {
    generateRandomPlatform();
    stateVariables.score++;
    stateVariables.highScore = Math.max(
      stateVariables.highScore,
      stateVariables.score
    );
    doodlerState.distanceFromGround += getRandomInt(
      MIN_PLATFORM_SPACING,
      MAX_PLATFORM_SPACING
    );
  }
}


export function collisionDetection(
  doodler: Doodler,
  platform: Platform | Power
) {
  return (
    doodler.startPoint.x < platform.startPoint.x + platform.w &&
    doodler.startPoint.x + doodler.w > platform.startPoint.x &&
    doodler.startPoint.y < platform.startPoint.y + platform.h &&
    doodler.startPoint.y + doodler.h > platform.startPoint.y
  );
}

//function that handles the movement of Doodler in the right or left direction
export function moveDoodler(): void {
  stateVariables.doodler.startPoint.x += doodlerState.dx;
  if (doodlerState.dx > 0) doodlerState.dx -= X_DIR_VELOCITY_DAMPENING;
  if (doodlerState.dx < 0) doodlerState.dx += X_DIR_VELOCITY_DAMPENING;
}


export function checkAndHandleCollision() {
  stateVariables.platformArray.forEach((platform) => {
    if (
      collisionDetection(stateVariables.doodler, platform) &&
      doodlerState.dy >= 0 &&
      platform.type == PlatformType.flexible
    ) {
      stateVariables.doodler.startPoint.y =
        platform.startPoint.y - stateVariables.doodler.h;

      doodlerState.onPlatform = true;
      doodlerState.onGround = false;
      doodlerState.dy = -SPEED_Y;
    }
  });
}

//function that makes the Doodler jump continuously on ground or tiles
//if Doodler falls then, calls the gameover function too
export function handleJump(): void {
  if (doodlerState.hasPower) {
    doodlerState.dy = -SPEED_Y;
  }
  doodlerState.dy += doodlerState.gravity;
  stateVariables.doodler.startPoint.y += doodlerState.dy;

  if (
    stateVariables.doodler.startPoint.y >=
      DIMENSIONS.CANVAS_HEIGHT - stateVariables.doodler.h &&
    doodlerState.onGround
  ) {
    doodlerState.dy = -SPEED_Y;
  }

  if (
    stateVariables.doodler.startPoint.y +
      stateVariables.doodler.h -
      doodlerState.gravity * 2 >=
    DIMENSIONS.CANVAS_HEIGHT
  ) {
    gameOver();
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

export function checkForPowerCollision() {
  stateVariables.powerArray.forEach((power) => {
    if (collisionDetection(stateVariables.doodler, power)) {
      if (!doodlerState.hasPower) initiateJetpackPower();
    }
  });
}

export function initiateJetpackPower() {
  doodlerState.hasPower = true;
  const jetpack = setTimeout(() => {
    clearTimeout(jetpack);
    doodlerState.hasPower = false;
  }, JETPACK_DURATION);
}

export function gameOverAnimation() {
  if (doodlerState.fallDistance > 0) {
    const dy =
      stateVariables.doodler.startPoint.y - DIMENSIONS.CANVAS_HEIGHT / 2;
    stateVariables.platformArray.forEach((element) => {
      element.startPoint.y -= dy;
    });
    stateVariables.powerArray.forEach((power) => {
      power.startPoint.y -= dy;
    });
    stateVariables.doodler.startPoint.y -= dy;
    stateVariables.doodler.startPoint.y += 5;
    doodlerState.fallDistance -= 5;
  } else {
    stateVariables.gameOverTransition > 0
      ? drawGameOver((stateVariables.gameOverTransition -= 4))
      : drawGameOver(0);
    if (stateVariables.doodler.startPoint.y < DIMENSIONS.CANVAS_HEIGHT) {
      stateVariables.doodler.startPoint.y += 4;
    }
  }
}
//updates the leaderboard(scoreboard) at the gameover
export function updateLeaderboard(
  parentElement: HTMLOListElement,
  element: HTMLLIElement,
  username: string
) {
  element.innerHTML = `${username}  &nbsp; &nbsp;<b>${stateVariables.score}</b>`;
  parentElement.appendChild(element);
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
  doodlerState.distanceFromGround = 0;
  doodlerState.onPlatform = false;
  doodlerState.onGround = true;
  doodlerState.dx = 0;
  doodlerState.dy = 0;
  stateVariables.gameOverTransition = 150;
  stateVariables.platformArray = [];
  stateVariables.gameState = GameState.initialisation;
  cancelAnimationFrame(stateVariables.reqAnimFrame);
  initialiseGame();
}
