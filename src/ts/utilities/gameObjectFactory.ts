
import { Background } from "../gameObjects/background";
import { Player } from "../gameObjects/player";
import { GenericMovingEnemy } from "../gameObjects/enemies/genericMovingEnemy";

export class GameObjectFactory {

    game: Phaser.Game;

    constructor(game: Phaser.Game) {
        this.game = game;
    }

    private createSprite(key, x: number = 0, y: number = 0, scale: Phaser.Point = new Phaser.Point(1, 1)): Phaser.Sprite {
        var sprite = this.game.add.sprite(0, 0, key);
        sprite.anchor = new Phaser.Point(0.5, 0.5);
        sprite.scale = scale;
        sprite.position.x = x;
        sprite.position.y = y;
        return sprite;
    }

    createBackground(): Background {
        return new Background(this.game, this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background'));
    }

    createPlayer(): Player {
        var playerSprite = this.createSprite('player', this.game.world.centerX, this.game.height - 100, playerSprite.scale = new Phaser.Point(0.5, 0.5));
        return new Player(this.game, playerSprite);
    }

    createGenericMovingEnemy(): GenericMovingEnemy {
        var enemeySprite = this.createSprite('enemy', undefined, undefined, new Phaser.Point(0.5, 0.5));
        return new GenericMovingEnemy(this.game, this.game.add.sprite(0, 0, 'enemy'));
    }
}