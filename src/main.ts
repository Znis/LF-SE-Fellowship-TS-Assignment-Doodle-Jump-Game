import drawCanvas, { drawGameOver, showStartMessage } from "./canvas";
import "./controls.ts";
import {
  checkAndHandleCollision,
  handleJump,
  moveRandomPlatforms,
  initialiseGame,
} from "./functions";
import { stateVariables, GameState } from "./state-variables.ts";
import "./style.css";

const startScreen = document.querySelector<HTMLDivElement>("#info-screen")!;
const enterBtn = document.querySelector<HTMLButtonElement>("#enter-btn")!;
const username_input = document.querySelector<HTMLInputElement>("#name")!;
let username = "";

enterBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  username = username_input.value || "";
 

  stateVariables.gameState = GameState.initialisation;
  initialiseGame();

});

export function draw() {
  stateVariables.reqAnimFrame = requestAnimationFrame(draw);
  console.log(stateVariables.gameState)
  drawCanvas();
  if (stateVariables.gameState == GameState.initialisation) {
    showStartMessage();

  } else if (stateVariables.gameState == GameState.running) {
    handleJump();
    moveRandomPlatforms();
    checkAndHandleCollision();
  } else if (stateVariables.gameState == GameState.gameOver) {
    drawGameOver();
    stateVariables.highScore =
    stateVariables.score > stateVariables.highScore
      ? stateVariables.score
      : stateVariables.highScore;
      cancelAnimationFrame(stateVariables.reqAnimFrame);
  } 

}
//run the gameloop only if the gamestate is not in welcomeScreen
if (stateVariables.gameState != GameState.welcomeScreen) {
  requestAnimationFrame(draw);
}
