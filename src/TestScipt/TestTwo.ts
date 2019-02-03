import * as PIXI from 'pixi.js';
import { generateSprite, textureCombieTool } from '../utils/LocalUtils';

const TEXTS = ['hello', 'thinking', 'shy', 'word'];
const PRICES = ['200.00', '1,000.00', '500.00', '700.00'];

export default class TestTwo {
    private _app: PIXI.Application;
    private _emojiSprite: PIXI.Sprite[] = [];
    private _currencySprite: PIXI.Sprite[] = [];
    private _bindedUpdate: (delta: number) => void;

    //#region animation variable
    private _disband?: () => void;
    private _eslapTime: number;
    private _isRuning: boolean = false
    //#endregion


    public setUp(app: PIXI.Application) {
        this._app = app;

        this._bindedUpdate = this._update.bind(this);

        const pLoader: any = PIXI.loader;

        const emojiUrlList: string[] = [];
        for (let i = 0; i < 5; i++) {
            const url = 'asset/emoji' + (i + 1) + '.png';
            emojiUrlList.push(url)
        }
        const currencySpriteUrl: string[] = [];
        for (let i = 0; i < 4; i++) {
            const url = 'asset/currency' + (i + 1) + '.png';
            currencySpriteUrl.push(url);
        }

        const loadCompleteCallback: () => void = () => {
            const emojiSprite: PIXI.Sprite[] = [];
            for (let i = 0; i < 5; i++) {
                const rss = pLoader.resources[emojiUrlList[i]];
                const sprite = new PIXI.Sprite(rss.texture);
                sprite.anchor.set(0.5);
                emojiSprite.push(sprite);
            }

            const currencySprite: PIXI.Sprite[] = [];
            for (let i = 0; i < 4; i++) {
                const rss = pLoader.resources[currencySpriteUrl[i]];
                const sprite = new PIXI.Sprite(rss.texture);
                sprite.anchor.set(0.5);
                emojiSprite.push(sprite);
            }

            this._currencySprite = currencySprite;
            this._emojiSprite = emojiSprite;

            this._startAnimation();
        }



        if (pLoader.resources['asset/emoji1.png']) { // check texture loaded 
            loadCompleteCallback();
        } else {
            const loadList = emojiUrlList.concat(currencySpriteUrl);
            pLoader.add(loadList).load(loadCompleteCallback);

        }

    }

    public stopAll() {
        this._app.ticker.remove(this._bindedUpdate);
        this._cleanUp();

    }

    private _cleanUp() {
        const disband = this._disband;
        this._disband = undefined;

        disband && disband();
    }

    private _startAnimation() {
        this._app.ticker.add(this._bindedUpdate);
    }

    private _update(delta: number) {

        const eslapTime = this._eslapTime = this._eslapTime += (delta * 20);

        if (!this._isRuning) {
            const combinedTexture = textureCombieTool(this._buildTextConfig());
            this._disband = combinedTexture(this._app.stage);
            this._eslapTime = 0;
            this._isRuning = true;
        }

        if (eslapTime >= 2000) {
            const disband = this._disband;
            this._disband = undefined;

            disband && disband();
            this._isRuning = false;
        }
    }

    private _buildTextConfig() {
        const array: ICombieData[] = [];
        if (this._randomWholeNumber(10) > 5) {
            const emojiCount: number = this._randomWholeNumber(4);
            const textCount: number = this._randomWholeNumber(3);

            const emojiSprite = this._emojiSprite;
            for (let i = 0; i < emojiCount; i++) {
                const data: ICombieData = Object.create(null);
                data.sprite = emojiSprite[this._randomWholeNumber(emojiSprite.length - 1)]
                array.push(data);
            }

            for (let i = 0; i < textCount; i++) {
                const data: ICombieData = Object.create(null);
                data.text = TEXTS[this._randomWholeNumber(TEXTS.length - 1)];
                array.push(data)
            }

            return array;

        } else {
            const currencySprite = this._currencySprite;
            const data: ICombieData = Object.create(null);
            data.sprite = currencySprite[this._randomWholeNumber(currencySprite.length - 1)];
            array.push(data);


            const priceData: ICombieData = Object.create(null);
            data.text = PRICES[this._randomWholeNumber(PRICES.length - 1)];
            array.push(priceData);
            return array;
        }
    }


    private _randomWholeNumber(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }



}