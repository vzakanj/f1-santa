
export class Constants {
    static mainMenuFontStyle(): Phaser.PhaserTextStyle {
        return {
            font: "15px Arial",
            fill: "#19de65"
        }
    }

    static gameBounds(): Phaser.Point {
        return new Phaser.Point(800, 600);
    }

    static backgroundMovement(): Phaser.Point {
        return new Phaser.Point(0, 20);
    }

    static playerSpeed(): number {
        return 200;
    }

    static genericEnemySettings(): { [id: string]: number } {
        return {
            "speed": Math.random() * 50 + 25
        };
    }

    static kamikazeEnemySettings(): { [id: string]: any } {
        return {
            "speed": Math.random() * 100 + 25,
            "angleCorrection": -Math.PI / 2,
            "anchor": new Phaser.Point(.5, .5)
        };
    }

    static regularPlayerBullet(): { [id: string]: any } {
        return {
            "velocity": new Phaser.Point(0, -500)
        }
    }
    
    static bulletCooldowns() : { [id: string] : number }{
        return {
            'regularPlayerBullet' : 0.2
        }
    }
}
