import { IStrategyAI, XYData } from "./IStrategyAI";
import {Cell, paramsCell} from "../cell";

export class SimpleStrategyAI implements IStrategyAI {
    doMove(cells: Array<Cell>): XYData {
        let randomX: number = Phaser.Math.Between(0,
            cells[cells.length - 1].getCellX + paramsCell.sizeCell);
        let randomY: number = Phaser.Math.Between(0,
            cells[cells.length - 1].getCellY + paramsCell.sizeCell);

        return new XYData(randomX, randomY);
    }

}
