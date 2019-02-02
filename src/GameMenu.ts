import * as PIXI from 'pixi.js';
import { generateSpriteButton } from './utils/LocalUtils';

export class GameMenu {

    private _app: PIXI.Application;
    private _button1: PIXI.Sprite;

    public setUp(app: any) {
        this._app = app;
        const button = generateSpriteButton('asset/button.png', this._onButtonTouch.bind(this), 'Test1');
        button.x = 100;
        button.y = 100;
        app.stage.addChild(button);

        const button = generateSpriteButton('asset/button.png', this._onButtonTouch.bind(this), 'Test2');
        button.x = 100;
        button.y = 200;
        app.stage.addChild(button);


        const button = generateSpriteButton('asset/button.png', this._onButtonTouch.bind(this), 'test3');
        button.x = 100;
        button.y = 300;
        app.stage.addChild(button);

        console.log('hello');
    }


    private _onButtonTouch() {
        console.log('Hello World');
    }


    public run() {
        if (!this._app) {
            throw new Error('GameMenu :: run : game are not proper SetUp!');
        }
    }


}