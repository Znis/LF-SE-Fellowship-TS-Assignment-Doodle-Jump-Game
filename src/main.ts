import drawCanvas, { showStartMessage } from "./canvas";
import "./controls.ts";
import {
  checkAndHandleCollision,
  handleJump,
  moveRandomPlatforms,
  initialiseGame,
  moveDoodler,
  updateCameraPosition,
  gameOverAnimation,
  checkForPowerCollision,
} from "./functions";
import { stateVariables, GameState } from "./state-variables.ts";
import "./style.css";

const startScreen = document.querySelector<HTMLDivElement>("#info-screen")!;
const enterBtn = document.querySelector<HTMLButtonElement>("#enter-btn")!;
// const username_input = document.querySelector<HTMLInputElement>("#name")!;
// let username = "";

enterBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  // username = username_input.value || "";

  stateVariables.gameState = GameState.initialisation;
  initialiseGame();
});

export function draw() {
  stateVariables.reqAnimFrame = requestAnimationFrame(draw);
  drawCanvas();
  if (stateVariables.gameState == GameState.initialisation) {
    showStartMessage();
  } else if (stateVariables.gameState == GameState.running) {
    updateCameraPosition();
    handleJump();
    moveDoodler();
    moveRandomPlatforms();
    checkAndHandleCollision();
    checkForPowerCollision();
  } else if (stateVariables.gameState == GameState.gameOver) {
    gameOverAnimation();
    stateVariables.highScore =
      stateVariables.score > stateVariables.highScore
        ? stateVariables.score
        : stateVariables.highScore;
  }
}
//run the gameloop only if the gamestate is not in welcomeScreen
if (stateVariables.gameState != GameState.welcomeScreen) {
  requestAnimationFrame(draw);
}
