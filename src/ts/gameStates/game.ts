
import { Constants } from "../utilities/constants";
import { BaseState } from "./baseState";
import { Background } from "../gameObjects/background";
import { Player } from "../gameObjects/player";
import { GameObjectFactory } from "../utilities/gameObjectFactory";
import { BaseEnemy } from "../gameObjects/enemies/baseEnemy";
import { ExtendedArray, Predicate } from "../utilities/extendedArray";
import { GenericMovingEnemy } from "../gameObjects/enemies/genericMovingEnemy";
import { KamikazeEnemy } from "../gameObjects/enemies/kamikazeEnemy";
import { BasePlayerBullet } from "../gameObjects/playerBullets/basePlayerBullet";
import { RegularPlayerBullet } from "../gameObjects/playerBullets/regularPlayerBullet";




export class Gameplay extends BaseState {

    background: Background;
    player: Player;
    enemies: ExtendedArray<BaseEnemy>;
    playerBullets: ExtendedArray<BasePlayerBullet>;
    cooldowns = {
        'regularPlayerBullet': 0
    };

    create(): void {

        // Background
        this.background = this.gameObjectFactory.createBackground();
        this.background.tileSprite.autoScroll(Constants.backgroundMovement().x, Constants.backgroundMovement().y);

        // Player
        this.player = this.gameObjectFactory.createPlayer();

        // Enemies
        this.enemies = new ExtendedArray<BaseEnemy>();
        this.enemySpawner();

        // Bullets
        this.playerBullets = new ExtendedArray<BasePlayerBullet>();
    }

    enemySpawner(): void {

        // Generic enemy spawner
        this.game.time.events.loop(2000, () => {
            var spawnCount = 3;
            var toSpawn = this.enemies.takeWhere(spawnCount, x => !x.active && x instanceof GenericMovingEnemy);
            for (let e of toSpawn) {
                e.resetEnemy();
            }
            for (var i = 0; i < spawnCount - toSpawn.length; i++) {
                this.enemies.push(this.gameObjectFactory.createGenericMovingEnemy());
            }
        }, this);

        // Kamikaze enemy spawner 
        this.game.time.events.loop(3000, () => {

            var toSpawn = this.enemies.firstOrDefault(x => !x.active && x instanceof KamikazeEnemy);
            if (toSpawn == null) {
                this.enemies.push(this.gameObjectFactory.createKamikazeEnemy());
            } else {
                toSpawn.resetEnemy();
            }

        }, this);
    }

    playerBulletSpawner(): void {

        var shootDown = this.player.isKeyDown('shoot');

        // Cooldowns
        this.cooldowns.regularPlayerBullet -= this.game.time.physicsElapsed;

        // RegularPlayerBullet
        if (shootDown && this.cooldowns.regularPlayerBullet < 0) {
            console.log(this.playerBullets.length);
            this.cooldowns.regularPlayerBullet = Constants.bulletCooldowns()['regularPlayerBullet'];
            var bp = new Phaser.Point(this.player.x, this.player.y);
            var bullet = this.playerBullets.firstOrDefault(x => !x.active && x instanceof RegularPlayerBullet);
            if (bullet == null) {
                this.playerBullets.push(this.gameObjectFactory.createRegularPlayerBullet(bp.x, bp.y));
            } else {
                bullet.spawnBullet(bp);
            }
        }

    }

    update(): void {
        this.player.update();

        for (let enemy of this.enemies) {
            enemy.update(this.player);
            this.game.physics.arcade.collide(this.player.sprite, enemy.sprite, this.playerEnemyCollision, null, this);

            for (let playerBullet of this.playerBullets) {
                playerBullet.update(enemy);
            }
        }



        this.playerBulletSpawner();
    }


    private playerEnemyCollision(playerSprite: Phaser.Sprite, enemySprite: Phaser.Sprite): void {

    }
}