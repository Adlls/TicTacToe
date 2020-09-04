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
        let styleText = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        let styleButton = {
            backgroundColor: "#f7ae4a",
            color: "#ffffff", padding: 20,
            borderRadius: '50px',
            font: 'bold 24px Arial',
            align: 'center'
        };

        this.title = this.add.text(this.cameras.main.centerX - this.titleText.length/2 * 32 + 40, 100, this.titleText, styleText);

        this.buttonAgain = this.add.text(
            this.cameras.main.centerX - this.titleButtonAgain.length/2 * 24, 200, this.titleButtonAgain, styleButton
        );


        this.buttonAgain.setInteractive();
        this.buttonAgain.on('pointerdown', () => {
            this.scene.start("mainScene")
        }, this);
    }

}
