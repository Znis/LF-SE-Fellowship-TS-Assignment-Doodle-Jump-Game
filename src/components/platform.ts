import Point from "../shapes/point.ts";
import { DIMENSIONS } from "../constants.ts";
import { getRandomInt } from "../utils.ts";
import { PlatformType } from "../state-variables.ts";
export interface IPlatform {
  startPoint: Point; //it represents the top-left point of the rectangular container of the doodler
  h: number;
  w: number;
  type: PlatformType;
  imagePath: string;
  image: HTMLImageElement;
}
export default class Platform implements IPlatform {
  startPoint: Point;
  h: number;
  w: number;
  imagePath: string;
  image: HTMLImageElement;
  type: PlatformType;
  move: boolean;
  dx: number;
  constructor(startPoint: Point, h: number, w: number, imagePath: string) {
    this.startPoint = startPoint;
    this.h = h;
    this.w = w;
    this.move = getRandomInt(0, 4) < 1 ? true : false; //25% chance that the tile moves
    this.dx = 1;
    this.type = this.assignType() as PlatformType;
    this.image = new Image();
    this.imagePath = this.assignImgSrc() || imagePath;
    this.image.src = this.imagePath;
  }
  //randomly assigns the type of tile
  assignType() {
    const randNum = Math.random();
    if (randNum < 0.05) {
      return PlatformType.broken; //5% chance that the tile is broken tile
    } else {
      return PlatformType.flexible;
    }
  }
  //function that assigns image to the tile as per its type
  assignImgSrc() {
    if (this.type == PlatformType.flexible)
      return "./assets/images/platform-flexible.png";
    if (this.type == PlatformType.broken)
      return "./assets/images/platform-broken.png";
  }
  //function that moves the platform across the canvas
  movePlatform() {
    if (this.move) {
      this.startPoint.x += this.dx;

      if (
        this.startPoint.x + this.w >= DIMENSIONS.CANVAS_WIDTH ||
        this.startPoint.x <= 0
      ) {
        this.dx *= -1; //change the tile movement direction if it reaches edges in the canvas
      }
    }
  }
}
