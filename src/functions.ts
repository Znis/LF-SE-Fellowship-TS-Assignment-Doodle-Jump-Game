import Doodler from "./components/doodler";
import Point from "./shapes/point";
import { DIMENSIONS, DOODLER_HEIGHT, DOODLER_WIDTH, PLATFORM_HEIGHT, PLATFORM_WIDTH, MAX_PLATFORM_SPACING, MIN_PLATFORM_SPACING, SPEED_Y } from "./constants";
import { Direction, doodlerState, stateVariables } from "./state-variables";
import Platform from "./components/platform";
import { getRandomInt } from "./utils";

export function initialiseDoodler(): void{
    stateVariables.doodler = new Doodler(new Point(DIMENSIONS.CANVAS_WIDTH/2 - DOODLER_WIDTH, DIMENSIONS.CANVAS_HEIGHT-DOODLER_HEIGHT), DOODLER_HEIGHT,DOODLER_WIDTH, Direction.right);
}

export function generatePlatforms(minHeight: number, maxHeight: number): void{
   let i = 0;
    while(i < Math.floor((maxHeight-minHeight)/MIN_PLATFORM_SPACING)){
        const platform: Platform = new Platform(new Point(getRandomInt(0,DIMENSIONS.CANVAS_WIDTH-PLATFORM_WIDTH) , i*MIN_PLATFORM_SPACING), PLATFORM_HEIGHT,PLATFORM_WIDTH, './assets/images/platform.png');
        stateVariables.platformArray.push(platform);
        i++;
    }
    
}

export function updateCameraPosition(): void{
    const dy = stateVariables.doodler.startPoint.y - DIMENSIONS.CANVAS_HEIGHT/2;
    stateVariables.doodler.startPoint.y -= dy; 
    doodlerState.distanceFromGround += Math.abs(dy);
    if(stateVariables.platformArray[0].startPoint.y > getRandomInt(MIN_PLATFORM_SPACING, MAX_PLATFORM_SPACING)){
        const platform: Platform = new Platform(new Point(getRandomInt(0,DIMENSIONS.CANVAS_WIDTH-PLATFORM_WIDTH) , 0), PLATFORM_HEIGHT,PLATFORM_WIDTH, './assets/images/platform.png');
        stateVariables.platformArray.unshift(platform);
    }
  
    stateVariables.platformArray.forEach(element => {
        element.startPoint.y -= dy;
    });

}

export function collisionDetection(doodler: Doodler, platform: Platform){
    return (
        doodler.startPoint.x < platform.startPoint.x + platform.w && doodler.startPoint.x + doodler.w > platform.startPoint.x && doodler.startPoint.y < platform.startPoint.y + platform.h && doodler.startPoint.y + doodler.h < platform.startPoint.y
      );
}

export function checkAndHandleCollision(){
    stateVariables.platformArray.forEach((platform) => {
        if (collisionDetection(stateVariables.doodler, platform) && doodlerState.dy <= 0) {
            stateVariables.doodler.startPoint.y = platform.startPoint.y  + stateVariables.doodler.h;
          doodlerState.dy = SPEED_Y;
        }
     
      });
}

export function handleJump(): void{
    if(doodlerState.isGrounded){
    doodlerState.isGrounded = false;
    const jump = setInterval(() => {
        doodlerState.dy > SPEED_Y ? doodlerState.dy = (-1) * doodlerState.dy : doodlerState.dy += 1;
        stateVariables.doodler.startPoint.y -= doodlerState.dy;
        if(doodlerState.dy == 0){
            clearInterval(jump);
            doodlerState.isGrounded = true;

        }
    


        
    },1000/60);
}
  

if(stateVariables.doodler.startPoint.y < DIMENSIONS.CANVAS_HEIGHT/2 && doodlerState.isGrounded){
    doodlerState.distanceFromGround += DIMENSIONS.CANVAS_WIDTH / 2;

    updateCameraPosition();
    }
}
export function goRight(): void{
    const doodlerTopLeftX = stateVariables.doodler.startPoint.x;
    if( doodlerTopLeftX > DIMENSIONS.CANVAS_WIDTH) {
        stateVariables.doodler.startPoint.x = 0;
    }else{
        stateVariables.doodler.startPoint.x += 10;
    }

}
export function goLeft(): void{
    const doodlerBottomRightX = stateVariables.doodler.startPoint.x + stateVariables.doodler.w;
    if( doodlerBottomRightX < 0) {
        stateVariables.doodler.startPoint.x = DIMENSIONS.CANVAS_WIDTH - stateVariables.doodler.w;
    }else{
        stateVariables.doodler.startPoint.x -= 10;
    }
    

}