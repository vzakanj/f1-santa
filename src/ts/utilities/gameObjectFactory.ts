
import { Background } from "../gameObjects/background";
import { Player } from "../gameObjects/player";
import { GenericMovingEnemy } from "../gameObjects/enemies/genericMovingEnemy";
import { KamikazeEnemy } from "../gameObjects/enemies/kamikazeEnemy";
import { WobbleEnemy } from "../gameObjects/enemies/wobbleEnemy";
import { RegularPlayerBullet } from "../gameObjects/playerBullets/regularPlayerBullet";
import { BaseEnemyBullet} from "../gameObjects/enemyBullets/baseEnemyBullets";
import { EnemyForwardMovingBullet} from "../gameObjects/enemyBullets/enemyForwardMovingBullet";
import {Gameplay } from "../gameStates/game";
import {ExtendedArray} from "./extendedArray";

export enum BulletTypes {
    'forward'
}

export class GameObjectFactory {

    private game: Phaser.Game;
    private defaultGameObjectsScale: Phaser.Point;
    public gamePlayState: Gameplay;

    constructor(game: Phaser.Game) {
        this.game = game;
        this.defaultGameObjectsScale = new Phaser.Point(.5, .5);
    }

    private createSprite(key, x: number = 0, y: number = 0, scale: Phaser.Point = new Phaser.Point(1, 1)): Phaser.Sprite {
        var sprite = this.game.add.sprite(0, 0, key);
        sprite.anchor = new Phaser.Point(.5, .5);
        sprite.scale = scale;
        sprite.position.x = x;
        sprite.position.y = y;
        return sprite;
    }

    private createSpriteSheet(key, x: number = 0, y: number = 0, scale: Phaser.Point = new Phaser.Point(1, 1)): Phaser.Sprite {
        var sprite = this.game.add.sprite(0, 0, key);
        sprite.anchor = new Phaser.Point(.5, .5);
        sprite.scale = scale;
        sprite.position.x = x;
        sprite.position.y = y;
        return sprite;
    }

    public createBackground(): Background {
        return new Background(this.game, this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background'));
    }

    public createPlayer(): Player {
        var playerSprite = this.createSprite('player', this.game.world.centerX, this.game.height - 100, new Phaser.Point(.3, .3));
        var player = new Player(this.game, playerSprite);
        player.setIdleAnimation([2]);
        player.setMovingLeftAnimation([6, 5, 1, 0]);
        player.setMovingRightAnimation([3, 4, 7, 8]);
        return player;
    }



    public createGenericMovingEnemy(): GenericMovingEnemy {
        var enemySprite = this.createSprite('enemy', undefined, undefined, this.defaultGameObjectsScale);
        return new GenericMovingEnemy(this.game, enemySprite, this.gamePlayState);
    }

    public createKamikazeEnemy(): KamikazeEnemy {
        var enemeySprite = this.createSprite('enemy', undefined, undefined, this.defaultGameObjectsScale);
        return new KamikazeEnemy(this.game, enemeySprite, this.gamePlayState);
    }

    public createWobbleEnemy(): WobbleEnemy {
        var enemeySprite = this.createSprite('enemy', undefined, undefined, this.defaultGameObjectsScale);
        return new WobbleEnemy(this.game, enemeySprite, this.gamePlayState);
    }

    public createRegularPlayerBullet(x: number, y: number): RegularPlayerBullet {
        return new RegularPlayerBullet(this.game, this.createSprite('regularPlayerBullet', x, y, this.defaultGameObjectsScale));
    }

    public createEnemyBullet(type: BulletTypes, x: number, y: number): ExtendedArray<BaseEnemyBullet> {
        var bullets = new ExtendedArray<BaseEnemyBullet>();
        switch (type) {
            case BulletTypes.forward: {
                bullets.push(new EnemyForwardMovingBullet(this.game, this.createSprite('regularPlayerBullet', x, y, this.defaultGameObjectsScale)));
            }
        }

        return bullets;
    }

    private gamePlayStateException() {
        if (!this.gamePlayState) {
            throw new Error("Property GamePlayState is not implemented.");
        }
    }
}