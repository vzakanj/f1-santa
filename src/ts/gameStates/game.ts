
import { Constants } from "../utilities/constants";
import { BaseState } from "./baseState";
import { Background } from "../gameObjects/background";
import { Player } from "../gameObjects/player";
import { GameObjectFactory } from "../utilities/gameObjectFactory";
import { BaseEnemy } from "../gameObjects/enemies/baseEnemy";
import { ExtendedArray, Predicate } from "../utilities/extendedArray";
import { GenericMovingEnemy } from "../gameObjects/enemies/genericMovingEnemy";
import { KamikazeEnemy } from "../gameObjects/enemies/kamikazeEnemy";
import { WobbleEnemy } from "../gameObjects/enemies/wobbleEnemy";
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
        this.background.tileSprite.autoScroll(Constants.backgroundMovement.x, Constants.backgroundMovement.y);

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

        this.game.time.events.loop(20000, () => {
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
        this.game.time.events.loop(30000, () => {

            var toSpawn = this.enemies.firstOrDefault(x => !x.active && x instanceof KamikazeEnemy);
            if (toSpawn == null) {
                this.enemies.push(this.gameObjectFactory.createKamikazeEnemy());
            } else {
                toSpawn.resetEnemy();
            }

        }, this);

        // Wobble enemy spawner
        this.game.time.events.loop(3000, () => {

            var toSpawn = this.enemies.firstOrDefault(x => !x.active && x instanceof WobbleEnemy);
            if (toSpawn == null) {
                this.enemies.push(this.gameObjectFactory.createWobbleEnemy());
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
            this.cooldowns.regularPlayerBullet = Constants.bulletCooldowns['regularPlayerBullet'];
            var lbp = new Phaser.Point(this.player.x - Constants.regularPlayerBullet["spawnOffsetX"], this.player.y);
            var rbp = new Phaser.Point(this.player.x + Constants.regularPlayerBullet["spawnOffsetX"], this.player.y);
            var bullets = this.playerBullets.takeWhere(2, x => x && !x.active && x instanceof RegularPlayerBullet);
            if (bullets.length == 2) {
                bullets[0].spawnBullet(lbp);
                bullets[1].spawnBullet(rbp);
            }
            else {
                this.playerBullets.push(this.gameObjectFactory.createRegularPlayerBullet(lbp.x, lbp.y));
                this.playerBullets.push(this.gameObjectFactory.createRegularPlayerBullet(rbp.x, rbp.y));
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
                this.game.physics.arcade.collide(enemy.sprite, playerBullet.sprite, this.enemyBulletCollision, null, this);
            }
        }

        this.playerBulletSpawner();
    }


    private playerEnemyCollision(playerSprite: Phaser.Sprite, enemySprite: Phaser.Sprite): void {
        enemySprite['object'].deactivateEnemy();
    }

    private enemyBulletCollision(enemySprite: Phaser.Sprite, bulletSprite: Phaser.Sprite): void {
        var enemy: BaseEnemy = enemySprite['object'];
        var bullet: BasePlayerBullet = bulletSprite['object'];
        enemy.deactivateEnemy();
        bullet.deactivateBullet();
    }
}