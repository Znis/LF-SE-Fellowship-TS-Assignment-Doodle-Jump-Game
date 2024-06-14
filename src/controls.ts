import { GameState, stateVariables } from "./state-variables";
import {
  handleJump,
  goRight,
  goLeft,
  startGame,
  pauseGame,
  resumeGame,
  restartGame,
} from "./functions";

export default window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d": {
      goRight();
      break;
    }
    case "a": {
      goLeft();
      break;
    }
    //start or restart the game
    case "r": {
      if (stateVariables.gameState == GameState.gameOver) {
        restartGame();
      }
      if (stateVariables.gameState == GameState.paused) {
        resumeGame();
      }
      if (stateVariables.gameState == GameState.initialisation) {
        startGame();
      }

      break;
    }
    //pause and resume the running game
    case "q": {
      if (stateVariables.gameState == GameState.running) {
        pauseGame();
      } else if (stateVariables.gameState == GameState.paused) {
        resumeGame();
      }
      break;
    }
  }
});
