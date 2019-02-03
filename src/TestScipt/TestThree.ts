import * as PIXI from 'pixi.js';
import { Emitter } from 'pixi-particles';
//#region  Config 
const PARTICLE_CONFIG = {
    "alpha": {
        "start": 0.62,
        "end": 0
    },
    "scale": {
        "start": 0.5,
        "end": 0.1
    },
    "color": {
        "start": "fff191",
        "end": "ff622c"
    },
    "speed": {
        "start": 1200,
        "end": 400
    },
    "startRotation": {
        "min": 265,
        "max": 275
    },
    "rotationSpeed": {
        "min": 50,
        "max": 50
    },
    "lifetime": {
        "min": 0.1,
        "max": 0.2
    },
    "blendMode": "normal",
    "frequency": 0.025,
    "emitterLifetime": 0,
    "maxParticles": 10,
    "pos": {
        "x": 0,
        "y": 0
    },
    "addAtBack": false,
    "spawnType": "circle",
    "spawnCircle": {
        "x": 0,
        "y": 0,
        "r": 15
    }
}
//#endregion

export default class TestThree {
    private _app: PIXI.Application;
    private _testThreeContianer: PIXI.Container;
    private _bindedUpdate: (delta: number) => void
    private _emitter: Emitter;

    public setUp(app: PIXI.Application) {
        this._app = app;
        const container = this._testThreeContianer = new PIXI.Container();
        container.x = 500;
        container.y = 300;
        app.stage.addChild(container);

        this._bindedUpdate = this._update.bind(this);

        const pLoader: any = PIXI.loader;
        const loadComplete: () => void = () => {
            const rss = pLoader.resources['asset/particle.png'];
            const texture = new PIXI.Texture(rss.texture);
            this._startParticle(texture);
        }

        if (pLoader.resources['asset/particle.png']) {
            loadComplete();
        } else {
            PIXI.loader.add('asset/particle.png').load(loadComplete);
        }

    }

    public stopAll() {
        this._app.ticker.remove(this._bindedUpdate);
        this._cleanUp();
    }

    private _cleanUp() {
        const emitter = this._emitter;
        emitter.cleanup();
        emitter.destroy();

        this._testThreeContianer.removeChildren();
        this._app.stage.removeChild(this._testThreeContianer);
    }

    private _startParticle(sprite: PIXI.Texture) {
        const emitter = this._emitter = new Emitter(
            this._testThreeContianer,
            sprite,
            PARTICLE_CONFIG
        )

        emitter.emit = true;

        this._app.ticker.add(this._bindedUpdate);
    }


    private _update(delta: number) {
        this._emitter.update(delta * 0.001);
    }
}; 