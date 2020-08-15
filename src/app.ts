import "phaser";
import GameConfig = Phaser.Types.Core.GameConfig;
import { gameConfig } from "./gameConfig";



export class TicTacToeGame extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

window.onload = () => {
    let game = new TicTacToeGame(gameConfig);
};
