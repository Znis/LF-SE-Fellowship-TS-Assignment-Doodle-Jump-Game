import { DIMENSIONS, DOODLER_WIDTH } from "./constants.ts";
import {
  Direction,
  GameState,
  doodlerState,
  stateVariables,
} from "./state-variables.ts";
const canvas = document.querySelector("#gameCanvas") as HTMLCanvasElement;
import { resumeGame, restartGame } from "./functions.ts";
import jetSprite from "./spriteAnim/spriteJet.ts";

const ctx = canvas.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

export default function drawCanvas(): void {
  //the canvas's display was set to none while the user was on WelcomeScreen so, now set it to block
  canvas.style.display = "block";

  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.fillStyle = "#f7efe7";

  ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  //the following for-loops draw the grid like background of the Doodle Jump game
  for (let i = 0; i < DIMENSIONS.CANVAS_WIDTH; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, DIMENSIONS.CANVAS_HEIGHT);
    ctx.strokeStyle = "#efdbc6";
    ctx.stroke();
  }
  for (let i = 0; i < DIMENSIONS.CANVAS_HEIGHT; i += 20) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(DIMENSIONS.CANVAS_HEIGHT, i);
    ctx.strokeStyle = "#efdbc6";
    ctx.stroke();
  }

  //draw the platform tiles
  stateVariables.platformArray.forEach((platform) => {
    ctx.beginPath();
    ctx.drawImage(
      platform.image,
      platform.startPoint.x,
      platform.startPoint.y,
      platform.w,
      platform.h
    );
  });

  //draw the power like Jetpack if present
  if (!doodlerState.hasPower) {
    stateVariables.powerArray.forEach((power) => {
      ctx.drawImage(
        power.image,
        power.startPoint.x,
        power.startPoint.y,
        power.w,
        power.h
      );
    });
  }

  //loop through the Jet Sprite frames to create the animation
  if (doodlerState.hasPower) {
    stateVariables.jetAnimIdx < 9
      ? stateVariables.jetAnimIdx++
      : (stateVariables.jetAnimIdx = 0);

    //if doodler is facing at the right direction
    if (doodlerState.doodlerDir == Direction.right) {
      ctx.drawImage(
        jetSprite.sprite,
        jetSprite.position[stateVariables.jetAnimIdx].x,
        jetSprite.position[stateVariables.jetAnimIdx].y,
        jetSprite.width,
        jetSprite.height,
        stateVariables.doodler.startPoint.x - 14,
        stateVariables.doodler.startPoint.y + 10,
        20,
        50
      );
    } 

    //if doodler is facing at the left direction
    else {
      ctx.drawImage(
        jetSprite.sprite,
        jetSprite.position[stateVariables.jetAnimIdx].x,
        jetSprite.position[stateVariables.jetAnimIdx].y,
        jetSprite.width,
        jetSprite.height,
        stateVariables.doodler.startPoint.x + DOODLER_WIDTH - 5,
        stateVariables.doodler.startPoint.y + 10,
        20,
        50
      );
    }
  }

  drawScore();

  //draw the doodler
  ctx.beginPath();
  ctx.drawImage(
    stateVariables.doodler.image,
    stateVariables.doodler.startPoint.x,
    stateVariables.doodler.startPoint.y,
    stateVariables.doodler.w,
    stateVariables.doodler.h
  );
}


canvas.addEventListener("click", () => {
  if (stateVariables.gameState == GameState.gameOver) {
    restartGame();
  }
  if (stateVariables.gameState == GameState.paused) {
    resumeGame();
  }
});


function drawScore(): void {
  ctx.font = "24px Outfit";
  ctx.fillStyle = "#FF5733";
  ctx.fillText("Score: " + stateVariables.score, 55, 30);
}


export function drawGameOver(i: number): void { //here the i is the variable to create animation effect for drawing gameover
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height);
  ctx.font = "32px Outfit";
  ctx.fillStyle = "#ff0000";
  ctx.fillText("Game Over", canvas.width / 2 - 10, canvas.height + (i - 150));
  ctx.font = "32px Outfit";
  ctx.fillText(
    `Score: ${stateVariables.score}`,
    canvas.width / 2 - 5,
    canvas.height + (i - 100)
  );
  ctx.font = "20px Outfit";
  ctx.fillText(
    `High Score: ${stateVariables.highScore}`,
    canvas.width / 2 - 5,
    canvas.height + (i - 50)
  );
  ctx.font = "18px Outfit";
  ctx.fillText(
    "Click to Restart",
    canvas.width / 2 - 5,
    canvas.height + (i - 10)
  );
}

export function drawGamePause(): void {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "32px Outfit";
  ctx.fillStyle = "orange";
  ctx.fillText("Game Paused", canvas.width / 2 - 10, canvas.height / 2 - 50);
  ctx.font = "24px Outfit";
  ctx.fillText(
    `Score: ${stateVariables.score}`,
    canvas.width / 2 - 5,
    canvas.height / 2 + 10
  );
  ctx.font = "20px Outfit";
  ctx.fillText(
    `High Score: ${stateVariables.highScore}`,
    canvas.width / 2 - 5,
    canvas.height / 2 + 70
  );
  ctx.font = "18px Outfit";
  ctx.fillText(
    "Click to Resume",
    canvas.width / 2 - 5,
    canvas.height / 2 + 140
  );
}

export function showStartMessage(): void {
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Press R to Start", canvas.width / 2, canvas.height - 60);
}
