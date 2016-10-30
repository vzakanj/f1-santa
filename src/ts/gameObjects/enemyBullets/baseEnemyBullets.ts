import { BaseGameObject } from "../baseGameObject";
import { BulletTypes  } from "../../utilities/gameObjectFactory";

export abstract class BaseEnemyBullet extends BaseGameObject {

    public damage: number;

    constructor(game: Phaser.Game, sprite: Phaser.Sprite) {
        super(game, sprite);
        this.damage = 10;
    }

    public abstract getBulletType(): BulletTypes;

    public deactivateBullet(): void {
        this.active = false;
        this.sprite.body.velocity = new Phaser.Point(0, 0);
        this.sprite.renderable = false;
    }
    public setVelocity(x, y): void {
        this.sprite.body.velocity = new Phaser.Point(x, y);
    }

    public setPosition(position: Phaser.Point): void {
        this.sprite.position.x = position.x;
        this.sprite.position.y = position.y;
    }

    public update(): void {
        if(!this.activate) return;
        this.handleOutOfScreenBounds();
    }

    public activate(position: Phaser.Point, velocity: Phaser.Point): void {
        this.active = true;
        this.sprite.renderable = true;
        this.setPosition(position);
        this.setVelocity(velocity.x, velocity.y);
    }

    private handleOutOfScreenBounds(): void {
        if (this.sprite.position.x < -100 || this.sprite.position.x > this.game.width  + 100
            || this.sprite.position.y < -100 || this.sprite.position.y> this.game.height  + 100 ) {
            this.active = false;
        }
    }
}