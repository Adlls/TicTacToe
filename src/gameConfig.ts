import "phaser";
import GameConfig = Phaser.Types.Core.GameConfig;
import {MainScene} from "./scenes/mainScene";
import {WinScene} from "./scenes/winScene";
import {FailScene} from "./scenes/failScene";

export const gameConfig: GameConfig = {
    title: "Tic tac toe",
    width: "100%",
    height: "150px",
    parent: "game",
    backgroundColor: "#2b69bc",
    scene: [
        MainScene,
        FailScene,
        WinScene
    ],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    }
};
