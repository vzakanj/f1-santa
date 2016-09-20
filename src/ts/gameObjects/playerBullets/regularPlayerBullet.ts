
import { BasePlayerBullet } from "./basePlayerBullet";
import { Constants } from "../../utilities/constants";
import { BaseEnemy } from "../enemies/baseEnemy";


export class RegularPlayerBullet extends BasePlayerBullet {
    
    constructor(game: Phaser.Game, sprite: Phaser.Sprite){
        super(game, sprite);
        this.spawnBullet(this.sprite.position);
    }    
    
    spawnBullet(pos: Phaser.Point){
        super.spawnBullet(pos);
        this.sprite.body.velocity.y = Constants.regularPlayerBullet["velocityY"];
    }
    
    update(enemy:BaseEnemy): void{
        super.update(enemy);
    }
}