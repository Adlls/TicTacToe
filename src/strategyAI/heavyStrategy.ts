import {IStrategyAI, XYData} from "./IStrategyAI";
import {Cell, paramsCell} from "../cell";
import {GameRules, paramsGrid} from "../gameRules";

export class HeavyStrategy implements IStrategyAI {


    private iSetHiderPlayerPosition: boolean = false;

    //мешаем игроку
    hinderPlayer(shapeBounds: Array<number>, cells: Array<Cell>, indexIteration: number): XYData {


        console.log("hinder player");


        let indexRow = 0;

            for (let j = shapeBounds[0]; j <= shapeBounds[1]; j = j + indexIteration) {
                if (GameRules.currentCountRectPerimeter - indexRow > 3 ) {
                    if (cells[j].isCross &&
                        cells[j + indexIteration].isCross &&
                        cells[j + indexIteration * 2].isCross) {

                       if (!cells[j + indexIteration * 3].isCross && !cells[j + indexIteration * 3].isCircle) {
                           return new XYData(
                               cells[j + indexIteration * 3].getCellX + 10,
                               cells[j + indexIteration * 3].getCellY + 10);
                       }
                    }
                } else if (GameRules.currentCountRectPerimeter - indexRow < 3) {
                    if (cells[j].isCross &&
                        cells[j - indexIteration].isCross &&
                        cells[j - indexIteration * 2].isCross) {

                        if (!cells[j - 3].isCross && !cells[j - 3].isCircle) {
                            return new XYData(
                                cells[j - indexIteration * 3].getCellX + 10,
                                cells[j - indexIteration * 3].getCellY + 10);
                        }
                    }
                }
                indexRow++;
            }

            return null;
    }

    //ищем решение для AI
    lookSolution(shapeBounds: Array<number> , cells: Array<Cell>, indexIteration: number): XYData {

        console.log("looks solution");

        for (let j = shapeBounds[0]; j < shapeBounds[1]; j = j + indexIteration) {
                if (cells[j].isCircle) {
                   if (j + indexIteration <= shapeBounds[1]) {
                        if (!cells[j + indexIteration].isCross &&
                            !cells[j + indexIteration].isCircle) {
                            return new XYData(
                                cells[j + indexIteration].getCellX + 10,
                                cells[j + indexIteration].getCellY + 10
                            );
                        }
                    } else if (j - indexIteration >= shapeBounds[0]) {
                            if (!cells[j - indexIteration].isCross &&
                                !cells[j - indexIteration].isCircle) {
                                return new XYData(
                                    cells[j - indexIteration].getCellX + 10,
                                    cells[j - indexIteration].getCellY + 10
                                );
                            }
                        }
                }
        }

        return null;

    }

    doMove(cells: Array<Cell>): XYData {

        let cols: Array<[number, number]> = GameRules.shapeBoundsCols(cells);
        let rows: Array<[number, number]> = GameRules.shapeBoundsRows(cells);
        //let diagonals: Array<[number, number]> = GameRules.shapeBoundsDiagonals(cells, rows);
        let xyRows: XYData;
        let xyCols: XYData;


        for (let i = 0; i < GameRules.currentCountRectPerimeter; i++) {
             xyRows = this.hinderPlayer(rows[i], cells, 1);
             xyCols = this.hinderPlayer(cols[i], cells, GameRules.currentCountRectPerimeter);
             if (xyRows) {
                 console.log(xyRows);
                 return xyRows;
             }

             if (xyCols) {
                 console.log(xyCols);
                 return xyCols;
             }
        }

        for (let j = 0; j < GameRules.currentCountRectPerimeter; j++) {
            xyRows = this.lookSolution(rows[j], cells, 1);
            xyCols = this.lookSolution(cols[j], cells, GameRules.currentCountRectPerimeter);
            if (xyRows) {
                console.log(xyRows);
                return xyRows;
            }

            if (xyCols) {
                console.log(xyCols);
                return xyCols;
            }
        }

        let randomX: number = Phaser.Math.Between(0,
            cells[cells.length - 1].getCellX + paramsCell.sizeCell);
        let randomY: number = Phaser.Math.Between(0,
            cells[cells.length - 1].getCellY + paramsCell.sizeCell);
        console.log(new XYData(randomX, randomY), "random");
        return new XYData(randomX, randomY);

    }
}
