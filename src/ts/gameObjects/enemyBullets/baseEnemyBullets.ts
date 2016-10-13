import { BaseGameObject } from "../baseGameObject";
import { BulletTypes  } from "../../utilities/gameObjectFactory";

export abstract class BaseEnemyBullet extends BaseGameObject {

    public damage: number;

    constructor(game: Phaser.Game, sprite: Phaser.Sprite) {
        super(game, sprite);
        this.damage = 10;
    }

    public abstract getBulletType(): BulletTypes;

    public setVelocity(x,y) : void {
        this.sprite.body.velocity = new Phaser.Point(x,y);
    }

    public update(): void {
        this.handleOutOfScreenBounds();
    }

    private handleOutOfScreenBounds(): void {
        if (this.sprite.position.x < -100 || this.sprite.position.x + 100 > this.game.width
            || this.sprite.position.y < -100 || this.sprite.position.y + 100 > this.game.height) {
            this.active = false;
        }
    }
}