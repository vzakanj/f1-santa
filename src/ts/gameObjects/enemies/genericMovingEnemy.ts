import { BaseGameObject } from "../baseGameObject";
import { Player } from "../player";
import { BaseEnemy } from "./baseEnemy";
import { Constants } from "../../utilities/constants";
import {Gameplay } from "../../gameStates/game";
import { BulletTypes  } from "../../utilities/gameObjectFactory";

export class GenericMovingEnemy extends BaseEnemy {

    private BULLETS_TO_SPAWN = 10;

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
            var bullets = this.gamePlayState.enemyBullets.takeWhere(10, x => x.active == false && x.getBulletType() == BulletTypes.forward);
            var toSpawn = this.BULLETS_TO_SPAWN - bullets.length;
            for (var i = 0; i < toSpawn; i++) {
                var bullet = this.gamePlayState.gameObjectFactory.createEnemyBullet(BulletTypes.forward, this.sprite.x, this.sprite.y);
                bullets.push(bullet);
                this.gamePlayState.enemyBullets.push(bullet);
            }
            // Start position and at 10 bullets from that position, ( spread bullets )
            var start = -100;
            for (let b of bullets) {
                b.position.x = this.position.x;
                b.position.y = this.position.y;
                b.active = true;
                b.setVelocity(start, 200);
                start += 25;
            }
        }, this);
        this.bulletSpawnerEvents.push(e1);
    }
}