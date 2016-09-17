
import { BasePlayerBullet } from "./baseplayerbullet";
import { Constants } from "../../utilities/constants";


export class RegularPlayerBullet extends BasePlayerBullet {
    
    
    
    constructor(game: Phaser.Game, sprite: Phaser.Sprite){
        super(game, sprite);
        this.spawnBullet(this.sprite.position);
    }    
    
    spawnBullet(pos: Phaser.Point){
        super.spawnBullet(pos);
        this.sprite.body.velocity = Constants.regularPlayerBullet()["velocity"];
    }
}