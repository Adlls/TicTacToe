import {Iplayer} from "../Iplayer";
import {User} from "./user";
import {Cell, paramsCell} from "../../cell";
import {GameRules} from "../../gameRules";

export class AI implements Iplayer {
    readonly forWhom: string;
    private isTurn: boolean;
    private countHorizontally: number;
    private countVertical: number;
    private countDiagonal: number;


    constructor() {
        this.isTurn = false;
        this.forWhom = "circle";
        this.countHorizontally = 0;
        this.countVertical = 0;
        this.countDiagonal = 0;
    }

    getTurn(): boolean {
        return this.isTurn;
    }
    setTurn(turn: boolean): void {
        this.isTurn = turn;
    }

    doMove(enemy: Iplayer,
           cells: Array<Cell>,
           addImage: Phaser.GameObjects.GameObjectFactory,
           input?: Phaser.Input.InputPlugin) {

        if (this.getTurn()) {
            let randomX: number = Phaser.Math.Between(0,
                GameRules.currentCountRectPerimeter*GameRules.currentCountRectPerimeter*paramsCell.sizeCell);
            let randomY: number = Phaser.Math.Between(0,
                GameRules.currentCountRectPerimeter*GameRules.currentCountRectPerimeter*paramsCell.sizeCell);
            for (let cell of cells) {
                if (cell.belongsCell(randomX, randomY)) {
                    if (cell.isCross || cell.isCircle) return;

                    cell.drawCircleOrCrossByPlayer(this, addImage);
                    this.setTurn(false);
                    enemy.setTurn(true);
                    return;
                }
            }
        }
    }

    isWinner(cells: Array<Cell>): boolean {
        return GameRules.playerWin(
            cells,
            this.forWhom,
            this.countHorizontally,
            this.countVertical,
            this.countDiagonal);
    }


}
