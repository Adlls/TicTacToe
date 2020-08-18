import "phaser";
import {Cell} from "../cell";

export interface Iplayer {
    getTurn(): boolean,
    setTurn(turn: boolean): void,
    readonly forWhom: string,
    doMove(enemy: Iplayer,
           cells: Array<Cell>,
           addImage: Phaser.GameObjects.GameObjectFactory,
           input?: Phaser.Input.InputPlugin)
    isWinner(cells: Array<Cell>): boolean
}
