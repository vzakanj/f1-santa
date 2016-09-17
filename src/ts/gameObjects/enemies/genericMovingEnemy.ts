import { BaseGameObject } from "../baseGameObject";
import { Player } from "../Player";
import { BaseEnemy } from "./baseEnemy";
import { Constants } from "../../utilities/constants";

export class GenericMovingEnemy extends BaseEnemy {
    
    constructor(game:Phaser.Game, sprite: Phaser.Sprite){
        super(game, sprite);
    }
    
    resetEnemy(): void{
        super.resetEnemy();
        this.sprite.body.velocity.y = Constants.genericEnemySettings()["speed"];
    }

}