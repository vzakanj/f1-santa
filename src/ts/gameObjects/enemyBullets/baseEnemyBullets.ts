import { BaseGameObject } from "../baseGameObject";

export class BaseEnemyBullet extends BaseGameObject {

    damage: number;

    constructor(game: Phaser.Game, sprite: Phaser.Sprite) {
        super(game, sprite);
        this.damage = 10;
    }

    update(): void {
        this.handleOutOfScreenBounds();
    }

    private handleOutOfScreenBounds(): void {
        if (this.sprite.position.x < -100 || this.sprite.position.x + 100 > this.game.width
            || this.sprite.position.y < -100 || this.sprite.position.x + 100 > this.game.height) {
            this.active = false;
        }
    }
}