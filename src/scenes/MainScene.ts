import TileSprite = Phaser.GameObjects.TileSprite;
import Graphics = Phaser.GameObjects.Graphics;
import { Scene } from "phaser";
import { store } from "../store";
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
import Pointer = Phaser.Input.Pointer;
import ArcadePhysics = Phaser.Physics.Arcade.ArcadePhysics;
import ImageWithDynamicBody = Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
import { gameConfig } from "../configs";

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
        const line = scene.add.graphics({
            lineStyle: {
                color: 0x00ffff
            }
        });
        line.clear().strokePoints([
            lineFrom,
            lineTo
        ]);
    }
}

const target = new Phaser.Math.Vector2();

export default class MainScene extends Phaser.Scene {

    public graphic: Graphics;
    public x: number = 100;
    public y: number = 100;
    public timer: number = 0;
    public testSprite: ImageWithDynamicBody;
    public cursors: CursorKeys;
    public speed: number = 100; // 100px/s  Phaser.Math.GetSpeed(100, 1);
    public distanceText: any;

    constructor() {
        super(gameConfig);
    }

    preload() {
        this.load.image('test', 'dist/test.png');
    }

    create() {

        this.cursors = this.input.keyboard.createCursorKeys();
        this.testSprite = this.physics.add.image(64, 64, 'test')

        const debug = this.add.graphics();

        this.input.on('pointerdown', (pointer: Pointer) => {

            target.x = pointer.x;
            target.y = pointer.y;

            this.physics.moveToObject(this.testSprite, target, this.speed);

            debug.clear().lineStyle(1, 0x00ff00);
            debug.lineBetween(0, target.y, 2000, target.y);
            debug.lineBetween(target.x, 0, target.x, 2000);
        }, this);

        /*
        scene = this;
        scene.scene.pause();
        setTimeout(() => {
            this.scene.resume();
        }, 1000);
        */


        this.graphic = this.add.graphics({ lineStyle: { color: 0x00ffff } });
        this.graphic.lineStyle(2, 0xffd900, 1);

        const headerStyle = {
            font: "12px Arial",
            fill: "#ff3232",
            align: "center"
        };

        this.distanceText = this.add.text(10, 10, 'target distance ...', headerStyle);
    }

    update(time: number, delta: number) {

        scene = this;
        super.update(time, delta);
        this.timer += delta;

        while (this.timer > 1000) {
            this.timer = 0;
        }

        const distance = Phaser.Math.Distance.Between(this.testSprite.x, this.testSprite.y, target.x, target.y);

        if (this.testSprite.body.speed > 0) {
            this.distanceText.setText('Distance: ' + distance);

            if (distance <= 4) {
                this.testSprite.body.reset(target.x, target.y);
            }
        }
    }

    render() {

    }
}
