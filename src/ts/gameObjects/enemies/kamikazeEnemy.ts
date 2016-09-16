import { BaseGameObject } from "../baseGameObject";
import { Player } from "../Player";
import { BaseEnemy } from "./baseEnemy";
import { Constants } from "../../utilities/constants";
import { MathHelper } from "../../utilities/mathhelper";

export class KamikazeEnemy extends BaseEnemy {

    speed: number;
    angleCorrection: number;
    constructor(game: Phaser.Game, sprite: Phaser.Sprite) {
        super(game, sprite);
        this.sprite.anchor = Constants.kamikazeEnemySettings()["anchor"];
        this.angleCorrection = Constants.kamikazeEnemySettings()["angleCorrection"];
    }

    resetEnemy(): void {
        this.active = true;
        this.speed = Constants.kamikazeEnemySettings()["speed"];
        super.xStartPosition();
        super.yStartPosition();
    }

    update(player: Player) {
        this.sprite.body.rotation = MathHelper.toDeg(this.game.physics.arcade.moveToObject(this.sprite, player.sprite, this.speed) + this.angleCorrection);
    }
}