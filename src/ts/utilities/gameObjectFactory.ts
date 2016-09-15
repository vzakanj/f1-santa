
import { Background } from "../gameObjects/background";
import { Player } from "../gameObjects/player";

export class GameObjectFactory {
    
    game: Phaser.Game;
    
    constructor(game: Phaser.Game){
        this.game = game;
    }
    
    createBackground() : Background {
        return new Background(this.game, this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background'));
    }
    
    createPlayer() : Player {
        var playerSprite = this.game.add.sprite(0,0,'player');
        playerSprite.anchor = new Phaser.Point(0.5,0.5);
        playerSprite.scale = new Phaser.Point(0.5,0.5);
        playerSprite.x = this.game.world.centerX;
        playerSprite.y = this.game.height - 100;
        return  new Player(this.game, playerSprite);
    }
    
}