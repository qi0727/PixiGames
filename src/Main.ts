import * as PIXI from 'pixi.js';
import { GameMenu } from './GameMenu';

const app = new PIXI.Application();
document.body.appendChild(app.view);

const gameMenu = new GameMenu();
gameMenu.setUp(app);

const framerate = document.getElementById("framerate");


const updateFps = (delta: number) => {
    if (framerate) {
        framerate.innerHTML = app.ticker.FPS.toString();
    }
}
app.ticker.add(updateFps);