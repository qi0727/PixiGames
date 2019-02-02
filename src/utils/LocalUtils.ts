import * as PIXI from 'pixi.js';



export function generateSpriteButton(spriteUrl: string, onTouchCallback: () => void, displaytext?: string) {

    const button = PIXI.Sprite.fromImage(spriteUrl);
    let container = Object.create(null);
    button.interactive = true;
    button.buttonMode = true;
    button.anchor.set(0.5);
    button.width = 200;
    button.height = 50;
    button.on('pointerdown', onTouchCallback);

    if (displaytext) {
        container = new PIXI.Container();
        const text = new PIXI.Text(displaytext, { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
        text.anchor.set(0.5);
        container.addChild(button);
        container.addChild(text);
    }

    return displaytext ? container : button;

} 