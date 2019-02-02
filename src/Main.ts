import * as PIXI from 'pixi.js';
import { GameMenu } from './GameMenu';

const app = new PIXI.Application();
document.body.appendChild(app.view);

const gameMenu = new GameMenu();
gameMenu.setUp(app);
