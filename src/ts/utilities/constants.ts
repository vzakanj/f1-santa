
export class Constants {
   static mainMenuFontStyle(): Phaser.PhaserTextStyle {
        return {
            font: "15px Arial",
            fill: "#19de65"
        }
    }
    
    static gameBounds() : Phaser.Point{
        return new Phaser.Point(800,600);
    }

}
