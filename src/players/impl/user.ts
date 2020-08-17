import {Iplayer} from "../Iplayer";
import {AI} from "./AI";
import {Cell} from "../../cell";
export class User implements Iplayer {
    readonly forWhom: string;
    private isTurn: boolean;

    constructor() {
        //пользователь идет первый
        this.isTurn = true;
        this.forWhom = "cross";
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


}
