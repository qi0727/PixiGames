import * as PIXI from 'pixi.js';
import { generateSprite } from '../utils/LocalUtils';

export default class TestOne extends PIXI.Container {
    private _sprites: PIXI.Sprite[] = [];
    private _testOneContainer: PIXI.Container;
    private _app: PIXI.Application;




    public setUp(app: PIXI.Application) {
        this._app = app;
        const container = this._testOneContainer = new PIXI.Container;

        const sprites = [];
        for (let i = 0; i < 144; i++) {
            const sprite = generateSprite('asset/card.png', i.toString(), false);
            sprites.push(sprite);
            container.addChild(sprite);
        }

        this._sprites = sprites;
        container.x = 350;
        container.y = 250;

        app.stage.addChild(container);
    }


}