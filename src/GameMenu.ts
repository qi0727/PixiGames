import * as PIXI from 'pixi.js';
import { generateSprite } from './utils/LocalUtils';
import TestOne from './TestScipt/TestOne';

export class GameMenu {

    private _app: PIXI.Application;
    private _testOneBtn: PIXI.Sprite;
    private _testTwoBtn: PIXI.Sprite;
    private _testThreeBtn: PIXI.Sprite;

    public setUp(app: any) {
        this._app = app;
        const btn1 = this._testOneBtn = generateSprite('asset/button.png', 'Test1', true, this._onTestOneTrigger.bind(this));
        btn1.x = 100;
        btn1.y = 100;
        app.stage.addChild(btn1);

        const btn2 = this._testTwoBtn = generateSprite('asset/button.png', 'Test2', true, this._onTestTwoTrigger.bind(this));
        btn2.x = 100;
        btn2.y = 200;
        app.stage.addChild(btn2);


        const btn3 = this._testThreeBtn = generateSprite('asset/button.png', 'test3', true, this._onTestThreeTrigger.bind(this));
        btn3.x = 100;
        btn3.y = 300;
        app.stage.addChild(btn3);
    }


    private _onTestOneTrigger() {
        const testOne = new TestOne();
        testOne.setUp(this._app);
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