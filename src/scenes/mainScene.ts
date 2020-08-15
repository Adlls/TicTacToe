import "phaser";
import {Cell} from "../cell";

export class MainScene extends Phaser.Scene {

     widthRect: number;
     heightRect: number;
     countRect: number;
     graphics: any;
     cells: Array<Cell>;

    constructor() {
        super({
            key: "mainScene"
        });
    }

    init(): void {
        this.widthRect = 80;
        this.heightRect = this.widthRect;
        this.countRect = 25;
        this.graphics = this.add.graphics();
    }

    preload(): void {

    }

    create(): void {

        let rectX: number = 400;
        let rectY: number = 80;
        this.graphics.lineStyle(2, 0xffffff, 1);


       for (let i = 1; i <= 5; i++) {
           for (let j = 1; j <= 5; j++) {
               //let rect = this.add.rectangle(rectX, rectY, this.widthRect, this.heightRect, 1);
               this.graphics.strokeRect(rectX, rectY, this.widthRect, this.heightRect);
               rectX += this.heightRect;
           }
           rectX = 400;
           rectY += this.widthRect;
       }

    }

    update(time: number): void {

    }

    private onClick() {

    }

}
