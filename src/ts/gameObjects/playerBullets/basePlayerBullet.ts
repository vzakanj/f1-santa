import { BaseGameObject } from "../baseGameObject";
import { Player } from "../Player";
import { BaseEnemy } from "../enemies/baseenemy";
import { Constants } from "../../utilities/constants";


export class BasePlayerBullet extends BaseGameObject {
    
    
    constructor(game: Phaser.Game, sprite: Phaser.Sprite){
        super(game, sprite);
    }
    
    
   public update(enemy: BaseEnemy): void{
        if(!this.active) return;
        
        if(this.sprite.position.y < 0 - this.sprite.height){
            this.active = false;
        } 
    }
    
    spawnBullet(pos: Phaser.Point){
        this.active = true;
        this.sprite.position = pos;
    }
}