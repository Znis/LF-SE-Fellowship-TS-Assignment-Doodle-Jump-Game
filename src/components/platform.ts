import { ImagePath } from './../state-variables';
import Point from "../shapes/point.ts";
export interface IPlatform {
  startPoint: Point; //it represents the top-left point of the rectangular container of the car
  h: number;
  w: number;
  imagePath: string;
  image: HTMLImageElement;
}
export default class Platform implements IPlatform {
  startPoint: Point;
  h: number;
  w: number;
  imagePath: string;
  image: HTMLImageElement;
  constructor(startPoint: Point, h: number, w: number, imagePath: string) {
    this.startPoint = startPoint;
    this.h = h;
    this.w = w;
    this.image = new Image();
    this.imagePath = imagePath;
    this.image.src = this.imagePath;
  }
}
