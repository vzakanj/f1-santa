

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

}
