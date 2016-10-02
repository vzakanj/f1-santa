import { BaseGameObject } from "../baseGameObject";
import { Player } from "../Player";
import { BaseEnemy } from "./baseEnemy";
import { Constants } from "../../utilities/constants";
import { MathHelper } from "../../utilities/mathHelper";
import {Gameplay } from "../../gameStates/game";

export class WobbleEnemy extends BaseEnemy {

    initialPosition: { x: number, y: number }
    constructor(game: Phaser.Game, sprite: Phaser.Sprite, gamePlayState: Gameplay) {
        super(game, sprite, gamePlayState);
    }

    resetEnemy(): void {
        super.resetEnemy();
        this.sprite.body.velocity.y = Constants.wobbleEnemySettings["speed"];
        this.initialPosition = {
            x: this.sprite.position.x,
            y: this.sprite.position.y
        }
    }

    update(player: Player) {
        if (!this.active) {
            return;
        }
        super.update(player);
        var amount = Math.sin(this.sprite.position.y / 50) * 50;
        this.sprite.position.x = this.initialPosition.x + amount;
    }

    spawnBullet(): void {

    }
}