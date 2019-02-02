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
        const text = createText(displaytext);
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

function createText(displaytext: string) {
    const text = new PIXI.Text(displaytext, { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
    text.anchor.set(0.5);
    return text;
}


export function textureCombieTool(data: ICombieData[]) {
    const container = new PIXI.Container();
    container.x = 300;
    container.y = 300;
    const defaultOffset = 10;
    let offset = 0;

    return (stage: any) => {
        for (const singleData of data) {
            if (singleData.sprite) {
                const sprite = singleData.sprite;
                sprite.x = offset;
                offset += sprite.width + defaultOffset;
                container.addChild(sprite);


            } else if (singleData.text) {
                const text = createText(singleData.text as string);
                text.x = offset;
                offset += text.width + defaultOffset;
                container.addChild(text);
            }
        }

        stage.addChild(container);

        return () => {
            stage.removeChild(container);
            container.removeChildren();
            container.destroy();
        }

    }

}






