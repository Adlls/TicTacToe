import "phaser";
import {Cell, paramsCell} from "../cell";
import {Iplayer} from "../players/Iplayer";
import {User} from "../players/impl/user";
import {AI} from "../players/impl/AI";
import {GameRules, paramsGrid} from "../gameRules";
import Game = Phaser.Game;

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
        GameRules.currentCountRectPerimeter = paramsGrid.countRectBasic;
        this.countRect = 25;
        this.graphics = this.add.graphics();
        this.cells = new Array<Cell>();
        this.initCells();
        this.user = new User();
        this.AI = new AI();
    }

    private initCells() {

        let rectX: number = this.cameras.main.centerX - paramsCell.sizeCell*(GameRules.currentCountRectPerimeter/2 + 1);
        let rectY: number = paramsCell.startY;
        for (let i = 0; i < GameRules.currentCountRectPerimeter; i++) {
            for (let j = 0; j < GameRules.currentCountRectPerimeter; j++) {
                rectX += paramsCell.sizeCell;
                let cell = new Cell(rectX, rectY);
                this.cells.push(cell);
            }
            rectX = this.cameras.main.centerX - paramsCell.sizeCell*(GameRules.currentCountRectPerimeter/2 + 1);
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

        if (GameRules.currentCountRectPerimeter != paramsGrid.contRectExtended) {
            this.cells = GameRules.checkForExtensionInitCells(this.cells, this.cameras);

            this.drawCells();
        }

        if (this.user.isWinner(this.cells)) this.scene.start("winScene");
         else if (this.AI.isWinner(this.cells)) this.scene.start("failScene");

        this.user.doMove(this.AI as AI, this.cells, this.add, this.input);
        this.AI.doMove(this.user as User, this.cells, this.add);

    }
}
