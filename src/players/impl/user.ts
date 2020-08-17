import {Iplayer} from "../Iplayer";
import {Cell, paramsCell} from "../../cell";
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

    public isWinner(cells: Array<Cell>): boolean {

        //сделать как отдельную ф-ю для границ сетки массива
        let countAcceptWin: number = 5;
        let boundRows: Array<[number, number]> = new Array<[number, number]>(5);
        let boundCols: Array<[number, number]> = new Array<[number, number]>(5);
        let boundDiagonals: Array<[number, number]> = new Array<[number, number]>();

        let indexBound = 0;
        for (let j = 0; j < cells.length; j = j + 5) {
            boundRows[indexBound] = [j, j + 5 - 1];
            indexBound++;
        }
        indexBound = 0;
        for (let j = 0; j < 5; j++) {
            boundCols[indexBound] = [j, cells.length - 5 + j];
            indexBound++;
        }

        indexBound = 0;
        let deltaDiagonalIncrement: number = 5 - countAcceptWin;
        for (let j = 0; j <= deltaDiagonalIncrement; j++) {
            boundDiagonals[indexBound] = [j, boundRows[boundRows.length - 1 - j][1]];
            indexBound++;

            boundDiagonals[indexBound] = [
                boundRows[0][1],
                boundRows[boundRows.length - 1 - j][0]];
            indexBound++;
        }



        let countHorizontally: number = 0;
        let countVertical: number = 0;
        let countDiagonal: number = 0;

        for (let cellOfBoundRow of boundRows) {
            for (let i = cellOfBoundRow[0]; i <= cellOfBoundRow[1]; i++) {
                if (cells[i].isCross) {
                    countHorizontally++;
                } else {
                    countHorizontally = 0;
                    break;
                }
                if (countHorizontally == 5) return true;
            }
        }

        for (let cellOfBoundColl of boundCols) {
            for (let i = cellOfBoundColl[0]; i <= cellOfBoundColl[1]; i = i + 5) {
                if (cells[i].isCross) {
                    countVertical++;
                } else {
                    countVertical = 0;
                    break;
                }
                if (countVertical == 5) return true;
            }
        }

        for (let i = 0; i < boundDiagonals.length; i++) {
            let indexDiagonal: number = -1;
            if (i % 2 == 0) indexDiagonal = 1;
            for (let j = boundDiagonals[i][0]; j <= boundDiagonals[i][1]; j = j + 5 + indexDiagonal) {
                if (cells[j].isCross) {
                    countDiagonal++
                } else {
                    countDiagonal = 0;
                    break;
                }
                if (countDiagonal == 5) return true;
            }
        }

        return false;
    }

}
