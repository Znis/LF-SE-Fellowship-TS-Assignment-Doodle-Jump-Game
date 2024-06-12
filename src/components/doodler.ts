import Point from "../shapes/point.ts";
import { Direction, ImagePath, stateVariables, doodlerState } from "../state-variables.ts";
export interface IDoodler {
  startPoint: Point; //it represents the top-left point of the rectangular container of the car
  h: number;
  w: number;
  imagePath: string;
  direction: Direction;
  image: HTMLImageElement;
}
export default class Doodler implements IDoodler {
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
    this.direction = direction
    this.imagePath = this.direction == Direction.right ? ImagePath.right : ImagePath.left;
    this.image.src = this.imagePath;
    console.log(this.imagePath);
  }
  updateDoodler(){
    this.direction = doodlerState.doodlerDir;
    this.imagePath = this.direction == Direction.right ? ImagePath.right : ImagePath.left;
  }
}
