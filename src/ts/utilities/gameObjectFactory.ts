
import { Background } from "../gameObjects/background";

export class GameObjectFactory {
    
    game: Phaser.Game;
    
    constructor(game: Phaser.Game){
        this.game = game;
    }
    
    createBackground() : Background {
        return new Background(this.game, this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background'));
    }
    
}