import * as PIXI from 'pixi.js';



export function generateSprite(spriteUrl: string, displaytext?: string, isButton: boolean = false, onTouchCallback?: () => void) {

    let sprite = PIXI.Sprite.fromImage(spriteUrl);
    let container = Object.create(null);

    sprite.anchor.set(0.5);

    if (isButton) {
        sprite = apendBtn(sprite, onTouchCallback);
    }

    if (displaytext) {
        container = new PIXI.Container();
        const text = new PIXI.Text(displaytext, { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
        text.anchor.set(0.5);
        container.addChild(sprite);
        container.addChild(text);
    }

    return displaytext ? container : sprite;

}

function apendBtn(sprite: PIXI.Sprite, onTouchCallback?: () => void) {
    sprite.interactive = true;
    sprite.buttonMode = true;
    if (onTouchCallback) {
        sprite.on('pointerdown', onTouchCallback);
    }

    return sprite;
}

