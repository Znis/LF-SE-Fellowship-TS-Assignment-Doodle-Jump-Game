import Doodler from "./components/doodler";
import Platform from "./components/platform";
import Power from "./components/power";

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

export enum PlatformType {
  flexible = "flexible",
  broken = "broken",
}
type stateVariables = {
  doodler: Doodler;
  gameState: GameState;
  score: number;
  highScore: number;
  platformArray: Platform[];
  gameOverTransition: number;
  jetAnimIdx: number;
  powerArray: Power[];
};
export const stateVariables = {
  doodler: {} as Doodler,
  gameState: GameState.welcomeScreen,
  score: 0,
  highScore: 0,
  platformArray: [] as Platform[],
  reqAnimFrame: 0,
  gameOverTransition: 150,
  jetAnimIdx: 0,
  powerArray: [] as Power[],
};

export const doodlerState = {
  doodlerDir: Direction.right,
  onGround: true,
  onPlatform: false,
  distanceFromGround: 0,
  gravity: 0.4,
  dy: 0,
  dx: 0,
  fallDistance: 500,
  hasPower: false,
};
