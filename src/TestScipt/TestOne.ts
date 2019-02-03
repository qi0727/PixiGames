import * as PIXI from 'pixi.js';
import { generateSprite } from '../utils/LocalUtils';

const ANIMATION_TIME = 2;
export default class TestOne {
    private _sprites: PIXI.Sprite[] = [];
    private _testOneContainer: PIXI.Container;
    private _app: PIXI.Application;
    private _runingAnim: any;
    private _bindedUpdate: any;
    private _completeCallback: any;


    public setUp(app: PIXI.Application, completeCallback: () => void) {
        this._completeCallback = completeCallback();
        this._app = app;
        const container = this._testOneContainer = new PIXI.Container;
        const sprites = [];
        for (let i = 0; i < 144; i++) {
            const sprite = generateSprite('asset/card.png', i.toString(), false);
            sprite.rotation = i * 0.1;
            sprites.push(sprite);
            container.addChild(sprite);
            container.setChildIndex(sprite, i);
        }

        this._sprites = sprites;
        container.x = 350;
        container.y = 250;

        app.stage.addChild(container);

        this._bindedUpdate = this._update.bind(this);
        this.startAnimation();
    }

    public startAnimation() {
        const container = this._testOneContainer;
        const sprites = this._sprites;

        let animationCounter = this._sprites.length - 1;
        let indexCounter = 0;

        const animationConpleteCallback: () => void = () => {
            this._runingAnim = undefined;
            container.setChildIndex(sprites[animationCounter], indexCounter);

            animationCounter -= 1;
            indexCounter++;
            if (animationCounter > -1) {
                this._runAnim(sprites[animationCounter], animationConpleteCallback);
            } else {
                this._onAnimationEnd();
            }
        }

        this._runAnim(sprites[animationCounter], animationConpleteCallback);
        this._app.ticker.add(this._bindedUpdate);
    }

    public stopAll() {
        this._runingAnim = undefined;
        this.cleanUp();
    }

    public cleanUp() {
        this._testOneContainer.removeChildren();
        this._app.stage.removeChild(this._testOneContainer);
        console.log('TestOne :: cleanUp : Clean Up Done!')
    }

    private _runAnim(sprite: PIXI.Sprite, callback: () => void) {
        if (this._runingAnim) {
            throw new Error('TestOne :: _runAnim : Should not run two animation together, please debug');
        }

        this._runingAnim = this._moveXAnimation(300, ANIMATION_TIME, sprite, callback);
    }

    private _onAnimationEnd() {
        const app = this._app;
        app.ticker.remove(this._bindedUpdate);
        console.log('TestOne :: _onAnimationEnd : animation Complete');

        const cb = this._completeCallback;
        cb && cb();
    }


    // this is specific for this animation only.
    private _moveXAnimation(distance: number, time: number, sprite: PIXI.Sprite, callback: () => void) {
        let runingDistance = distance;

        let eslapTime = 0;
        const targetTime = time;
        const targetDistance = sprite.x + distance;
        const speed = (distance / time) / 60;

        return (delta: number) => {

            sprite.x += speed * delta;

            if (sprite.x >= targetDistance) {
                sprite.x = targetDistance;
                callback && callback();
                return;
            }

        }

    }

    private _update(delta: number) {
        this._runingAnim && this._runingAnim(delta);
    }



}