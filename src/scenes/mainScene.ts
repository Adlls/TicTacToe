import "phaser";
import {Cell, paramsCell} from "../cell";

export class MainScene extends Phaser.Scene {


     countRect: number;
     graphics: Phaser.GameObjects.Graphics;
     cells: Array<Cell>;

    constructor() {
        super({
            key: "mainScene"
        });
    }

    private initCells() {
        let rectX: number = paramsCell.startX;
        let rectY: number = paramsCell.startY;
        for (let i = 1; i <= 5; i++) {
            for (let j = 1; j <= 5; j++) {
                rectX += paramsCell.sizeCell;
                let cell = new Cell(rectX, rectY);
                this.cells.push(cell);
            }
            rectX = paramsCell.startX;
            rectY += paramsCell.sizeCell;
        }
    }

    private drawCells() {
        this.graphics.lineStyle(1.5, 0xffffff, 1);
        for (let cell of this.cells) {
            cell.drawCell(this.graphics);
        }
    }

    init(): void {
        this.countRect = 25;
        this.graphics = this.add.graphics();
        this.cells = new Array<Cell>();
        this.initCells();
    }

    preload(): void {

    }

    create(): void {
        this.drawCells();
    }

    update(time: number): void {

    }

    private onClick() {

    }

}
