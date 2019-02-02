import * as PIXI from 'pixi.js';
import { generateSpriteButton } from './utils/LocalUtils';

export class GameMenu {

    private _app: PIXI.Application;
    private _testOneBtn: PIXI.Sprite;
    private _testTwoBtn: PIXI.Sprite;
    private _testThreeBtn: PIXI.Sprite;

    public setUp(app: any) {
        this._app = app;
        const btn1 = this._testOneBtn = generateSpriteButton('asset/button.png', this._onTestOneTrigger.bind(this), 'Test1');
        btn1.x = 100;
        btn1.y = 100;
        app.stage.addChild(btn1);

        const btn2 = this._testTwoBtn = generateSpriteButton('asset/button.png', this._onTestTwoTrigger.bind(this), 'Test2');
        btn2.x = 100;
        btn2.y = 200;
        app.stage.addChild(btn2);


        const btn3 = this._testThreeBtn = generateSpriteButton('asset/button.png', this._onTestThreeTrigger.bind(this), 'test3');
        btn3.x = 100;
        btn3.y = 300;
        app.stage.addChild(btn3);
    }


    private _onTestOneTrigger() {
        console.log('test 1');
    }
    private _onTestTwoTrigger() {
        console.log('test 2');
    }
    private _onTestThreeTrigger() {
        console.log('test 3');
    }



    public run() {
        if (!this._app) {
            throw new Error('GameMenu :: run : game are not proper SetUp!');
        }
    }


}