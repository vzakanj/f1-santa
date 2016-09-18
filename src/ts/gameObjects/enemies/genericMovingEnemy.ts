import { BaseGameObject } from "../baseGameObject";
import { Player } from "../player";
import { BaseEnemy } from "./baseEnemy";
import { Constants } from "../../utilities/constants";

export class GenericMovingEnemy extends BaseEnemy {
    
    constructor(game:Phaser.Game, sprite: Phaser.Sprite){
        super(game, sprite);
    }
    
    resetEnemy(): void{
        super.resetEnemy();
        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = Constants.genericEnemySettings["speed"];
    }

}