import {Iplayer} from "../Iplayer";
import {User} from "./user";
import {Cell, paramsCell} from "../../cell";

export class AI implements Iplayer {
    readonly forWhom: string;
    private isTurn: boolean;

    constructor() {
        this.isTurn = false;
        this.forWhom = "circle";
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
            let randomX: number = Phaser.Math.Between(0,25*paramsCell.sizeCell);
            let randomY: number = Phaser.Math.Between(0,25*paramsCell.sizeCell);
            for (let cell of cells) {
                if (cell.belongsCell(randomX, randomY)) {
                    if (cell.isCross || cell.isCircle) return;
                    console.log("AI сделал ход...");
                    cell.drawCircleOrCrossByPlayer(this, addImage);
                    this.setTurn(false);
                    enemy.setTurn(true);
                    return;
                }
            }
        }
    }


}
