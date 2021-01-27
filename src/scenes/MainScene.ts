import TileSprite = Phaser.GameObjects.TileSprite;
import Graphics = Phaser.GameObjects.Graphics;
import {Scene} from "phaser";

let scene: Scene;


interface LineForm {
    x: number;
    y: number;
}

interface LineTo {
    x: number;
    y: number;
}

class Player {

    static createLine(lineFrom: LineForm, lineTo: LineTo) {
        const line = scene.add.graphics({lineStyle: {color: 0x00ffff}});
        line.clear().strokePoints([
            lineFrom,
            lineTo
        ]);
    }
}


export default class MainScene extends Phaser.Scene {

    public graphic: Graphics;
    public x: number = 100;
    public y: number = 100;

    constructor() {
        super('demo');
    }

    preload() {
        this.load.image('logo', 'assets/phaser3-logo.png');
        this.load.image('libs', 'assets/libs.png');
        this.load.glsl('bundle', 'assets/plasma-bundle.glsl.js');
        this.load.glsl('stars', 'assets/starfields.glsl.js');
    }

    create() {

        scene = this;

        this.graphic = this.add.graphics({lineStyle: {color: 0x00ffff}});

        this.graphic.lineStyle(2, 0xffd900, 1);

        this.graphic
            .clear()
            .strokePoints([
                {x: 100, y: 100},
                {x: 200, y: 200},
            ], true, true);
    }

    update(time: number, delta: number) {

        scene = this;

        this.x++;
        this.y++;
        super.update(time, delta);

        Player.createLine({x: 100, y: 100}, {x: 200, y: 200})
    }
}
