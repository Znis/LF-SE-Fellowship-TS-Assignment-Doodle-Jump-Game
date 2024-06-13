import { DIMENSIONS } from "./constants.ts";
import { GameState,stateVariables } from "./state-variables.ts";
const canvas = document.querySelector("#gameCanvas") as HTMLCanvasElement;
import { resumeGame, initialiseGame, restartGame } from "./functions.ts";
const ctx = canvas.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;



export default function drawCanvas(): void {
  //the canvas's display was set to none while the user was on WelcomeScreen so, now set it to block
  canvas.style.display = "block"; 

  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.fillStyle = "#f7efe7";
  
  ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  for (let i = 0; i < DIMENSIONS.CANVAS_WIDTH; i+=20) {

    ctx.beginPath();
    ctx.moveTo(i,0);
    ctx.lineTo(i,DIMENSIONS.CANVAS_HEIGHT);
    ctx.strokeStyle = "#efdbc6";
    ctx.stroke();
  }
  for (let i = 0; i < DIMENSIONS.CANVAS_HEIGHT; i+=20) {

    ctx.beginPath();
    ctx.moveTo(0,i);
    ctx.lineTo(DIMENSIONS.CANVAS_HEIGHT, i);
    ctx.strokeStyle = "#efdbc6";
    ctx.stroke();
  }




  stateVariables.platformArray.forEach(element => {
    ctx.beginPath();
  ctx.drawImage(
    element.image,
    element.startPoint.x,
    element.startPoint.y,
    element.w,
    element.h
  );
  });

  ctx.beginPath();
  ctx.drawImage(
    stateVariables.doodler.image,
    stateVariables.doodler.startPoint.x,
    stateVariables.doodler.startPoint.y,
    stateVariables.doodler.w,
    stateVariables.doodler.h
  );
  drawScore();
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
  ctx.fillStyle = "#fff";
  ctx.fillText("Score: " + stateVariables.score, 50, 30);
}

export function drawGameOver(): void {
  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "48px Outfit";
  ctx.fillStyle = "#ff0000";
  ctx.fillText("Game Over", canvas.width / 2 - 30, canvas.height / 2 - 50);
  ctx.font = "32px Outfit";
  ctx.fillText(
    `Score: ${stateVariables.score}`,
    canvas.width / 2 - 100,
    canvas.height / 2 + 10
  );
  ctx.font = "26px Outfit";
  ctx.fillText(
    `High Score: ${stateVariables.highScore}`,
    canvas.width / 2 - 100,
    canvas.height / 2 + 70
  );
  ctx.font = "24px Outfit";
  ctx.fillText(
    "Click to Restart",
    canvas.width / 2 - 100,
    canvas.height / 2 + 140
  );
}
export function drawGamePause(): void {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "48px Outfit";
  ctx.fillStyle = "orange";
  ctx.fillText("Game Paused", canvas.width / 2 - 130, canvas.height / 2 - 50);
  ctx.font = "32px Outfit";
  ctx.fillText(
    `Score: ${stateVariables.score}`,
    canvas.width / 2 - 100,
    canvas.height / 2 + 10
  );
  ctx.font = "26px Outfit";
  ctx.fillText(
    `High Score: ${stateVariables.highScore}`,
    canvas.width / 2 - 100,
    canvas.height / 2 + 70
  );
  ctx.font = "24px Outfit";
  ctx.fillText(
    "Click to Resume",
    canvas.width / 2 - 100,
    canvas.height / 2 + 140
  );
}
export function showStartMessage(): void{
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText('Press Space to Start', canvas.width / 2, canvas.height - 60);
}