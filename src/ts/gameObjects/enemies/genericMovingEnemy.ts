import { BaseGameObject } from "../baseGameObject";
import { Player } from "../player";
import { BaseEnemy } from "./baseEnemy";
import { Constants } from "../../utilities/constants";
import {Gameplay } from "../../gameStates/game";
import { BulletTypes  } from "../../utilities/gameObjectFactory";

export class GenericMovingEnemy extends BaseEnemy {

    constructor(game: Phaser.Game, sprite: Phaser.Sprite, gamePlayState: Gameplay) {
        super(game, sprite, gamePlayState);
    }

    resetEnemy(): void {
        super.resetEnemy();
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = Constants.genericEnemySettings["speed"];
    }

    spawnBullet(): void {
        var e1 = this.game.time.events.loop(2000, function () {
            this.gamePlayState.enemyBullets.concat(this.gamePlayState.gameObjectFactory.createEnemyBullet(BulletTypes.forward, this.sprite.x, this.sprite.y));
        }, this);
        this.bulletSpawnerEvents.push(e1);
    }
}