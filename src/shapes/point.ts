export interface IPoint {
  x: number;
  y: number;

  distance: (point: IPoint) => number;
}

export default class Point implements IPoint {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  distance = (point: Point) =>
    Math.sqrt((point.x - this.x) ** 2 + (point.y - this.y) ** 2);
}
