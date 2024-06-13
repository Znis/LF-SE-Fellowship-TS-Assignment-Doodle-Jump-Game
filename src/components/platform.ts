import { ImagePath } from './../state-variables';
import Point from "../shapes/point.ts";
import { DIMENSIONS } from '../constants.ts';
import { getRandomInt } from '../utils.ts';
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
  move: boolean;
  dx: number;
  constructor(startPoint: Point, h: number, w: number, imagePath: string) {
    this.startPoint = startPoint;
    this.h = h;
    this.w = w;
    this.move = getRandomInt(0,4) < 1 ? true : false; 
    this.dx = 1;
    this.image = new Image();
    this.imagePath = imagePath;
    this.image.src = this.imagePath;
  }
  movePlatform(){
    if(this.move){
    
    this.startPoint.x += this.dx;

    if(((this.startPoint.x + this.w) >= DIMENSIONS.CANVAS_WIDTH) || (this.startPoint.x <= 0)) {
    this.dx *= (-1);
    }
    }
  }
}
