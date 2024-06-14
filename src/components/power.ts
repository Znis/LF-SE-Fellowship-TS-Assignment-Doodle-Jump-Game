import Point from "../shapes/point.ts";
export default class Power {
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
