
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
    
    static backgroundMovement() : Phaser.Point{
        return new Phaser.Point(0, -20);
    }

}
