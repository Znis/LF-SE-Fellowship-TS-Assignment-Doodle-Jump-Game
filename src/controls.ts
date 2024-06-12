
import { handleJump,
  goRight,
  goLeft,
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
  }
});
