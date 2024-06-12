import Doodler from "./components/doodler";
import Platform from "./components/platform";

//game state variables that is accessed globally
export enum GameState {
  welcomeScreen = "welcomeScreen",
  initialisation = "initialisation",
  running = "running",
  paused = "paused",
  resume = "resume",
  gameOver = "gameOver",
  restart = "restart",
}
export const ImagePath = {
  right: "./assets/images/doodler-right.png",
  left: "./assets/images/doodler-left.png",
};
export enum Direction {
  right = "right",
  left = "left",
}
type stateVariables = {
  doodler: Doodler,
  gameState: GameState;
  score: number;
  highScore: number;
  platformArray: Platform[],
};
export const stateVariables = {
  doodler: {} as Doodler,
  gameState: GameState.initialisation,
  score: 0,
  highScore: 0,
  platformArray: [] as Platform[],
};

export const doodlerState = {
  doodlerDir: Direction.right,
  isGrounded: true,
  distanceFromGround: 0,
  dy: 0,
};
