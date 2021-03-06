import {Iplayer} from "./players/Iplayer";

export enum paramsCell {
    sizeCell = 80,
    startX = 350,
    startY = 80
}

export class Cell {

    private circle: boolean;
    private cross: boolean;

    constructor( private cellX: number,
                 private cellY: number) {

        this.circle = false;
        this.cross = false;
    }


    get getCellX(): number {
        return this.cellX;
    }
    set setCellX(cellX: number) {
        this.cellX = cellX;
    }
    set setCellY(cellY: number) {
        this.cellY = cellY;
    }
    get getCellY(): number {
        return this.cellY;
    }
    get isCircle(): boolean {
        return this.circle;
    }
    set setCircle(circle: boolean) {
        this.circle = circle;
    }
    get isCross(): boolean {
        return this.cross;
    }
    set setCross(cross: boolean) {
        this.cross = cross;
    }

    public drawCell(graphics: Phaser.GameObjects.Graphics) {
        graphics.strokeRect(this.cellX, this.cellY, paramsCell.sizeCell, paramsCell.sizeCell);
    }

    public drawCircleOrCrossByPlayer(player: Iplayer, addImage: Phaser.GameObjects.GameObjectFactory) {
        if (player.forWhom == 'cross') {
            let drawCross = addImage.image(
                this.getCellX + (paramsCell.sizeCell / 2),
                this.getCellY + (paramsCell.sizeCell / 2), "crossImage");
            drawCross.setScale(0.5);
            this.setCross = true;

        } else if (player.forWhom == 'circle') {
            let drawCircle = addImage.image(
                this.getCellX + (paramsCell.sizeCell / 2),
                this.getCellY + (paramsCell.sizeCell / 2), "circleImage");
            drawCircle.setScale(0.5);
            this.setCircle = true;
        }
    }


    public belongsCell(targetX: number, targetY: number): boolean {
        let cellX1: number = this.getCellX;
        let cellX2: number = this.getCellX + paramsCell.sizeCell;
        let cellY1: number = this.getCellY;
        let cellY2: number = this.getCellY + paramsCell.sizeCell;

        return targetX > cellX1 && targetX < cellX2
                && targetY >= cellY1 && targetY < cellY2;
    }
}
