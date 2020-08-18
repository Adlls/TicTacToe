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
            index++;
        }
    }


    preload(): void {
        this.load.image("crossImage","assets/cross.png");
        this.load.image("circleImage", "assets/circle.png");

    }

    create(): void {
        this.drawCells();
    }

    update(time: number): void {
        this.user.doMove(this.AI as AI, this.cells, this.add, this.input);
        this.AI.doMove(this.user as User, this.cells, this.add);
        let isWinUser = this.user.isWinner(this.cells);
        let isWinAI = this.AI.isWinner(this.cells);
        console.log(isWinUser, " user win");
        console.log(isWinAI, " ai win");

    }
}
