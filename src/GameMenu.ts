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

        const button1 = generateSpriteButton('asset/button.png', this._onButtonTouch.bind(this), 'Test2');
        button1.x = 100;
        button1.y = 200;
        app.stage.addChild(button);


        const button2 = generateSpriteButton('asset/button.png', this._onButtonTouch.bind(this), 'test3');
        button2.x = 100;
        button2.y = 300;
        app.stage.addChild(button);
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