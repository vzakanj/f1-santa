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
        this.sprite.anchor = Constants.kamikazeEnemySettings["anchor"];
        this.angleCorrection = Constants.kamikazeEnemySettings["angleCorrection"];
    }

    resetEnemy(): void {
        super.resetEnemy();
        this.speed = Constants.kamikazeEnemySettings["speed"];
    }

    update(player: Player) {
        if(!this.active){
            return;
        }
        super.update(player);
        this.sprite.body.rotation = MathHelper.toDeg(this.game.physics.arcade.moveToObject(this.sprite, player.sprite, this.speed) + this.angleCorrection);
    }
}