import Spritejet from "/assets/images/jetSheet.png";
import Point from "../shapes/point";
const Sprite = new Image();
Sprite.src = Spritejet;
type JetSprite = {
  sprite: HTMLImageElement;
  width: number;
  height: number;
  position: Point[];
};

//the sprite is the png image containing different animation frames of the sprite
const jetSprite: JetSprite = {
  sprite: Sprite,
  width: 17,
  height: 54,
  position: [
    new Point(39, 128), //these are the points on the png image that each defines the boundary coordinates of the frame
    new Point(8, 0),
    new Point(39, 0),
    new Point(71, 0),
    new Point(104, 0),
    new Point(8, 64),
    new Point(39, 64),
    new Point(71, 64),
    new Point(104, 64),
    new Point(8, 128),
  ],
};
export default jetSprite;
