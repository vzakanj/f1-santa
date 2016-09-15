

export class BaseGameObject {

    game: Phaser.Game;
    sprite: Phaser.Sprite;

    constructor(game: Phaser.Game, sprite: Phaser.Sprite) {
        this.game = game;

        if (sprite) {
            this.sprite = sprite;
            this.game.physics.arcade.enableBody(this.sprite);
        }
    }

}
