import {IStrategyAI, XYData} from "./IStrategyAI";
import { Cell } from "../cell";

export class ContextAI {

    private strategy: IStrategyAI;

    constructor(strategy: IStrategyAI) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: IStrategyAI) {
        this.strategy = strategy;
    }

    public doSomeStrategy(cells: Array<Cell>): XYData {
        return this.strategy.doMove(cells);
    }
}
