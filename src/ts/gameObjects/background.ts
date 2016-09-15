
import { BaseGameObject } from "./baseGameObject";

export class Background  extends BaseGameObject {
    
    tileSprite: Phaser.TileSprite;
    
    constructor(game: Phaser.Game, sprite: Phaser.TileSprite){
        super(game, null);
        
        this.tileSprite = sprite;
    }
    
    
}