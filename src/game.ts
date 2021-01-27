import 'phaser';
import {MainScene} from "./scenes";

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#363636',
    width: window.screen.width,
    height: window.screen.height,
    scene: MainScene,
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 1000 },
            debug: true
        }
    },
};

const game = new Phaser.Game(config);
