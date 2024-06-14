import Point from "../shapes/point.ts";
import { Direction, ImagePath, doodlerState } from "../state-variables.ts";

export default class Doodler {
  startPoint: Point;
  h: number;
  w: number;
  imagePath: string;
  direction: Direction;
  image: HTMLImageElement;
  constructor(startPoint: Point, h: number, w: number, direction: Direction) {
    this.startPoint = startPoint;
    this.h = h;
    this.w = w;
    this.image = new Image();
    this.direction = direction;
    this.imagePath = this.direction == Direction.right ? ImagePath.right : ImagePath.left;
    this.image.src = this.imagePath;
  }
  updateDoodler() {
    this.direction = doodlerState.doodlerDir;
    this.imagePath = this.direction == Direction.right ? ImagePath.right : ImagePath.left;
    this.image.src = this.imagePath;
  }
}
