import drawCanvas from './canvas';
import "./controls.ts";
import { DIMENSIONS } from './constants';
import { checkAndHandleCollision, generatePlatforms, handleJump, initialiseDoodler, updateCameraPosition} from './functions';
import { doodlerState, stateVariables } from './state-variables';
import './style.css';

initialiseDoodler();
generatePlatforms(0, DIMENSIONS.CANVAS_HEIGHT);

function draw(){
    drawCanvas();
    handleJump();
    checkAndHandleCollision();
    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);