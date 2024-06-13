import { GameState, stateVariables } from "./state-variables";
import { handleJump,
  goRight,
  goLeft,
  startGame,
  pauseGame,
  resumeGame,
  restartGame
 } from "./functions";

export default window.addEventListener("keypress", (event) => {
  switch (event.key) {
    //jump
    case "w": {
      handleJump();
      
      break;
    }
    case "d": {
      goRight();
      break;
    }
    case "a": {
      goLeft();
      break;
    }
    case "e": {

      if (stateVariables.gameState == GameState.initialisation){
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
