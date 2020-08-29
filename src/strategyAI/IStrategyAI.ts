import {Cell} from "../cell";

export class XYData {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

}

export interface IStrategyAI {
    doMove(cells: Array<Cell>): XYData;
}
