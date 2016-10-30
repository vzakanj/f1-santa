
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
import { BaseEnemyBullet } from "../gameObjects/enemyBullets/baseEnemyBullets";




export class Gameplay extends BaseState {

    background: Background;
    player: Player;
    enemies: ExtendedArray<BaseEnemy>;
    enemiesSpriteGroup: Phaser.Group;
    playerBullets: ExtendedArray<BasePlayerBullet>;
    playerBulletsSpriteGroup: Phaser.Group;
    enemyBullets: ExtendedArray<BaseEnemyBullet>;
    enemyBulletsSpriteGroup: Phaser.Group;
    cooldowns = {
        'regularPlayerBullet': 0
    };

    create(): void {

        this.gameObjectFactory.gamePlayState = this;
        this.time.advancedTiming = true;
        //this.time.desiredFps = 30;

        // Background
        this.background = this.gameObjectFactory.createBackground();
        this.background.tileSprite.autoScroll(Constants.backgroundMovement.x, Constants.backgroundMovement.y);

        this.enemiesSpriteGroup = this.add.physicsGroup();
        this.playerBulletsSpriteGroup = this.add.physicsGroup();
        this.enemyBulletsSpriteGroup = this.add.physicsGroup();

        // Player
        this.player = this.gameObjectFactory.createPlayer();

        // Enemies
        this.enemies = new ExtendedArray<BaseEnemy>();
        this.enemySpawner();

        // Bullets
        this.playerBullets = new ExtendedArray<BasePlayerBullet>();
        this.enemyBullets = new ExtendedArray<BaseEnemyBullet>();
    }

    enemySpawner(): void {

        // Generic enemy spawner

        this.game.time.events.loop(10000, () => {
            var spawnCount = 1;
            var toSpawn = this.enemies.takeWhere(spawnCount, x => !x.active && x instanceof GenericMovingEnemy);
            for (let e of toSpawn) {
                e.resetEnemy();
            }
            for (var i = 0; i < spawnCount - toSpawn.length; i++) {
                var e = this.gameObjectFactory.createGenericMovingEnemy()
                this.enemies.push(e);
                this.enemiesSpriteGroup.add(e.sprite);
            }
        }, this);

        // Kamikaze enemy spawner 
        this.game.time.events.loop(4000, () => {

            var toSpawn = this.enemies.firstOrDefault(x => !x.active && x instanceof KamikazeEnemy);
            if (toSpawn == null) {
                var e = this.gameObjectFactory.createKamikazeEnemy();
                this.enemies.push(e);
                this.enemiesSpriteGroup.add(e.sprite);
            } else {
                toSpawn.resetEnemy();
            }

        }, this);

        // Wobble enemy spawner
        this.game.time.events.loop(3000, () => {

            var toSpawn = this.enemies.firstOrDefault(x => !x.active && x instanceof WobbleEnemy);
            if (toSpawn == null) {
                var e = this.gameObjectFactory.createWobbleEnemy();
                this.enemies.push(e);
                this.enemiesSpriteGroup.add(e.sprite);
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
            this.cooldowns.regularPlayerBullet = Constants.bulletCooldowns['regularPlayerBullet'];
            var lbp = new Phaser.Point(this.player.x - Constants.regularPlayerBullet["spawnOffsetX"], this.player.y);
            var rbp = new Phaser.Point(this.player.x + Constants.regularPlayerBullet["spawnOffsetX"], this.player.y);
            var bullets = this.playerBullets.takeWhere(2, x => !x.active && x instanceof RegularPlayerBullet);
            if (bullets.length == 2) {
                bullets[0].spawnBullet(lbp);
                bullets[1].spawnBullet(rbp);
            }
            else {
                var b1 = this.gameObjectFactory.createRegularPlayerBullet(lbp.x, lbp.y);
                var b2 = this.gameObjectFactory.createRegularPlayerBullet(rbp.x, rbp.y);
                this.playerBullets.push(b1);
                this.playerBullets.push(b2);
                this.playerBulletsSpriteGroup.add(b1.sprite);
                this.playerBulletsSpriteGroup.add(b2.sprite);
            }
        }

    }

    update(): void {
        this.player.update();
        this.game.physics.arcade.overlap(this.player.sprite, this.enemiesSpriteGroup, this.playerEnemyCollision, null, this);
        this.game.physics.arcade.overlap(this.enemiesSpriteGroup, this.playerBulletsSpriteGroup, this.enemyBulletCollision, null, this);
        this.game.physics.arcade.overlap(this.player.sprite, this.enemyBulletsSpriteGroup, this.enemyBulletPlayerCollision, null, this);


        for (let enemy of this.enemies) {
            if (!enemy.active) continue;
            enemy.update(this.player);
        }

        for (let playerBullet of this.playerBullets) {
            if (!playerBullet.active) continue;
            playerBullet.update();
        }

        for (let bullet of this.enemyBullets) {
            if (!bullet.active) continue;
            bullet.update();
        }

        this.playerBulletSpawner();
    }


    private playerEnemyCollision(playerSprite: Phaser.Sprite, enemySprite: Phaser.Sprite): void {
        if (enemySprite['object'].active) {
            enemySprite['object'].deactivateEnemy();
        }
    }

    private enemyBulletCollision(enemySprite: Phaser.Sprite, bulletSprite: Phaser.Sprite): void {
        var enemy: BaseEnemy = enemySprite['object'];
        var bullet: BasePlayerBullet = bulletSprite['object'];
        if (bullet.active && enemy.active) {
            enemy.health -= bullet.damage;
            if (enemy.health <= 0) {
                enemy.deactivateEnemy();
            } else {
                enemy.hit();
            }
            bullet.deactivateBullet();
        }
    }

    private enemyBulletPlayerCollision(playerSprite: Phaser.Sprite, bulletSprite: Phaser.Sprite): void {
        var bullet = bulletSprite['object'];
        if (bullet.active) {
            bullet.deactivateBullet();
        }
    }

    /******* DEBUG ********/
    public render() {
        this.game.debug.text("Player bullets size: " + this.playerBullets.length, 100, 100);
        this.game.debug.text("Enemies size: " + this.enemies.length, 100, 150);
        this.game.debug.text("Enemies bullets size: " + this.enemyBullets.length, 100, 200);
        this.game.debug.text(this.game.time.fps.toString(), 100, 50);
    }
}