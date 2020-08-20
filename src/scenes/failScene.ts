import "phaser";

export class FailScene extends Phaser.Scene {

    private title: Phaser.GameObjects.Text;
    private titleText: string;
    private titleButtonAgain;
    private buttonAgain: Phaser.GameObjects.Text;


    constructor() {
        super({
            key: "failScene"
        });
    }

    init(): void {
        this.titleText = "Вы проиграли".toUpperCase();
        this.titleButtonAgain = "Сыграть еще".toUpperCase();
    }

    create(): void {
        this.title = this.add.text(
            this.cameras.main.centerX - 228,
            64,
            this.titleText, {
                font: '64px',
                fill: '#ffffff'
            });
        this.buttonAgain = this.add.text(
            this.cameras.main.centerX - 120,
            180,
            this.titleButtonAgain, {
                backgroundColor: "#f7ae4a",
                color: "#ffffff",
                padding: 20,
                borderRadius: '50px',
                font: '22px Georgia',
                align: 'center',
            }
        );


        this.buttonAgain.setInteractive();
        this.buttonAgain.on('pointerdown', () => {
            this.scene.start("mainScene")
        }, this);
    }

}
