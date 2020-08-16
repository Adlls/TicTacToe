import {Iplayer} from "../Iplayer";
import {User} from "./user";

export class AI implements Iplayer {
    forWhom: string;
    isTurn: boolean;

    constructor() {
        let user = new User();
    }

    clickCell() {
    }

    getTurn(): boolean {
        return this.isTurn;
    }
    setTurn(turn: boolean): void {
        this.isTurn = turn;
    }

}
