
export interface Iplayer {
    getTurn(): boolean,
    setTurn(turn: boolean): void,
    readonly forWhom: string,
    clickCell()
}
