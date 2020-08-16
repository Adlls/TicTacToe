import {Iplayer} from "../Iplayer";

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

    clickCell() {
        this.isTurn = false;
        //...
    }

}
