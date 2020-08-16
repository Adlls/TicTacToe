import "phaser";
import { Cell, paramsCell } from "../cell";
import {Iplayer} from "../players/Iplayer";
import {User} from "../players/impl/user";
import {AI} from "../players/impl/AI";
export class MainScene extends Phaser.Scene {


     private countRect: number;
     private graphics: Phaser.GameObjects.Graphics;
     private cells: Array<Cell>;
     private user: Iplayer;
     private AI: Iplayer;

    constructor() {
        super({
            key: "mainScene"
        });
    }

    init(): void {
        this.countRect = 25;
        this.graphics = this.add.graphics();
        this.cells = new Array<Cell>();
        this.initCells();
        this.user = new User();
        this.AI = new AI();
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
        let index = 1;
        for (let cell of this.cells) {
            cell.drawCell(this.graphics);
            console.log(index+" cell x y", cell.getCellX, cell.getCellY);
            index++;
        }
    }

    checkCellByClick(x, y) {
        for (let cell of this.cells) {
            if (cell.belongsCell(x,y)) {
                let cross =  this.add.image(
                        cell.getCellX + (paramsCell.sizeCell/2),
                        cell.getCellY + (paramsCell.sizeCell/2), "crossImage");

                cross.setScale(0.5);
            }

        }
    }

    preload(): void {
        this.load.image("crossImage","assets/cross.png");

    }

    create(): void {
        this.drawCells();
        this.input.on('pointerdown', function () {
            console.log("x: ", this.input.x);
            console.log("y: ", this.input.y);
            this.checkCellByClick(this.input.x, this.input.y);
        }, this)
    }

    update(time: number): void {

    }

    private onClick() {

    }

}
