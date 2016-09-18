
export class Constants {
    static mainMenuFontStyle: Phaser.PhaserTextStyle = {
        font: "15px Arial",
        fill: "#19de65"
    }

    static gameBounds: Phaser.Point = new Phaser.Point(800, 600);
    static backgroundMovement: Phaser.Point = new Phaser.Point(0, 20);
    static playerSpeed = 200;

    static genericEnemySettings: { [id: string]: number } = {
        "speed": Math.random() * 50 + 25
    };
    static kamikazeEnemySettings: { [id: string]: any } = {
        "speed": Math.random() * 100 + 25,
        "angleCorrection": -Math.PI / 2,
        "anchor": new Phaser.Point(.5, .5)
    }
    static wobbleEnemySettings: { [id: string]: any } = {
        "speed": Math.random() * 100 + 25
    }

    static regularPlayerBullet: { [id: string]: any } = {
        "velocityY": -500,
        "spawnOffsetX": 20
    }

    static bulletCooldowns: { [id: string]: number } = {
        'regularPlayerBullet': 0.08

    }
}
