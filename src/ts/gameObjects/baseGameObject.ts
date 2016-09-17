

export class BaseGameObject {

    game: Phaser.Game;
    sprite: Phaser.Sprite;
    active: boolean;

    constructor(game: Phaser.Game, sprite: Phaser.Sprite) {
        this.game = game;
        this.active = true;
        if (sprite) {
            this.sprite = sprite;
            this.game.physics.arcade.enableBody(this.sprite);
        }
    }


    public get x(): number {
        if (this.sprite) {
            return this.sprite.position.x;
        }
        return 0;
    }



    public get y(): number {
        if (this.sprite) {
            return this.sprite.position.y;
        }
        return 0;
    }

    public get position(): Phaser.Point {
        if (this.sprite) {
            return this.sprite.position;
        }
        return new Phaser.Point(0, 0);
    }

}
