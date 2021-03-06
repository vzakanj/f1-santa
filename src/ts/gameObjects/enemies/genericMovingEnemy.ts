import { BaseGameObject } from "../baseGameObject";
import { Player } from "../player";
import { BaseEnemy } from "./baseEnemy";
import { Constants } from "../../utilities/constants";
import {Gameplay } from "../../gameStates/game";
import { BulletTypes  } from "../../utilities/gameObjectFactory";

export class GenericMovingEnemy extends BaseEnemy {

    private BULLETS_TO_SPAWN = 10;
    private BULLETS_SPEED = 50;

    constructor(game: Phaser.Game, sprite: Phaser.Sprite, gamePlayState: Gameplay) {
        super(game, sprite, gamePlayState);
    }

    resetEnemy(): void {
        super.resetEnemy();
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = this.BULLETS_SPEED;
    }

    spawnBullet(): void {
        var bullets = this.takeInactiveBullets(10, BulletTypes.forward);
        var toSpawn = this.BULLETS_TO_SPAWN - bullets.length;
        for (var i = 0; i < toSpawn; i++) {
            var bullet = this.gamePlayState.gameObjectFactory.createEnemyBullet(BulletTypes.forward, this.sprite.x, this.sprite.y, this.BULLETS_SPEED);
            bullets.push(bullet);
            this.gamePlayState.enemyBulletsSpriteGroup.add(bullet.sprite);
            this.gamePlayState.enemyBullets.push(bullet);
        }
        // Start position and at 10 bullets from that position, ( spread bullets )
        var start = -100;
        for (let b of bullets) {
            b.activate(this.position, new Phaser.Point(start += 25, this.BULLETS_SPEED));
        }
    }
}