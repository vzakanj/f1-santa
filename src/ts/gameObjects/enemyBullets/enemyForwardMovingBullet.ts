import { BaseGameObject } from "../baseGameObject";
import { BaseEnemyBullet } from "./BaseEnemyBullets";
import { Constants } from "../../utilities/constants";
import { BulletTypes  } from "../../utilities/gameObjectFactory";

export class EnemyForwardMovingBullet extends BaseEnemyBullet {
    constructor(game: Phaser.Game, sprite: Phaser.Sprite, speed?: number ) {
        super(game, sprite);

        if (!speed) {
            this.sprite.body.velocity.y = Constants.enemyBullets['forward'].speed;
        }else{
            this.sprite.body.velocity.y = speed;
        }

    }

    public getBulletType(): BulletTypes {
        return BulletTypes.forward;
    }
}