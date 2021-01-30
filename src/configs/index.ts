import { MainScene } from "../scenes";

const gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#181818',
    //"render.transparent": true,
    //"render.autoResize": true,
    transparent: false,
    width: window.screen.width,
    height: window.screen.height,
    scene: MainScene,
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
            gravity: { y: 0 },
            debug: true
        }
    },
    disableContextMenu: false
}

export {
    gameConfig
}
