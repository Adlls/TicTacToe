import {Iplayer} from "../Iplayer";
import {Cell, paramsCell} from "../../cell";
import {GameRules} from "../../gameRules";
export class User implements Iplayer {
    readonly forWhom: string;
    private isTurn: boolean;
    private countHorizontally: number;
    private countVertical: number;
    private countDiagonal: number;

    constructor() {
        //пользователь идет первый
        this.isTurn = true;
        this.forWhom = "cross";
        this.countHorizontally = 0;
        this.countVertical = 0;
        this.countDiagonal = 0;
    }

     getTurn(): boolean {
        return this.isTurn;
    }
    setTurn(turn: boolean) {
        this.isTurn = turn;
    }


    doMove(enemy: Iplayer,
           cells: Array<Cell>,
           addImage: Phaser.GameObjects.GameObjectFactory,
           input?: Phaser.Input.InputPlugin) {

        input.on("pointerdown", () => {
            if (this.getTurn()) {
                for (let cell of cells) {
                    if (cell.belongsCell(input.x, input.y)) {
                        if (cell.isCross || cell.isCircle) return;
                        cell.drawCircleOrCrossByPlayer(this, addImage);
                        this.setTurn(false);
                        enemy.setTurn(true);
                        return;
                    }
                }
            }
        }, this);
    }

    public isWinner(cells: Array<Cell>): boolean {
       return GameRules.playerWin(
           cells,
           this.forWhom,
           this.countHorizontally,
           this.countVertical,
           this.countDiagonal);
    }
}
