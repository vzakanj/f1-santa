
import { Background } from "../gameObjects/background";
import { Player } from "../gameObjects/player";
import { GenericMovingEnemy } from "../gameObjects/enemies/genericMovingEnemy";
import { KamikazeEnemy } from "../gameObjects/enemies/kamikazeEnemy";
import { WobbleEnemy } from "../gameObjects/enemies/wobbleEnemy";
import { RegularPlayerBullet } from "../gameObjects/playerBullets/regularPlayerBullet";

export class GameObjectFactory {

    game: Phaser.Game;
    defaultGameObjectsScale: Phaser.Point;

    constructor(game: Phaser.Game) {
        this.game = game;
        this.defaultGameObjectsScale = new Phaser.Point(.5,.5);
    }

    private createSprite(key, x: number = 0, y: number = 0, scale: Phaser.Point = new Phaser.Point(1, 1)): Phaser.Sprite {
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
        var playerSprite = this.createSprite('player', this.game.world.centerX, this.game.height - 100, this.defaultGameObjectsScale);
        return new Player(this.game, playerSprite);
    }

    public createGenericMovingEnemy(): GenericMovingEnemy {
        var enemeySprite = this.createSprite('enemy', undefined, undefined, this.defaultGameObjectsScale);
        return new GenericMovingEnemy(this.game, enemeySprite);
    }
    
    public createKamikazeEnemy(): KamikazeEnemy {
        var enemeySprite = this.createSprite('enemy', undefined, undefined, this.defaultGameObjectsScale);
        return new KamikazeEnemy(this.game, enemeySprite);
    }
    
     public createWobbleEnemy(): WobbleEnemy {
        var enemeySprite = this.createSprite('enemy', undefined, undefined, this.defaultGameObjectsScale);
        return new WobbleEnemy(this.game, enemeySprite);
    }
    
    public createRegularPlayerBullet(x: number, y: number): RegularPlayerBullet{
        return new RegularPlayerBullet(this.game, this.createSprite('regularPlayerBullet', x,y, this.defaultGameObjectsScale));
    } 
}