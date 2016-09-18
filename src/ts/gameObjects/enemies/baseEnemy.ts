import { BaseGameObject } from "../baseGameObject";
import { Player } from "../player";
import { Constants } from "../../utilities/constants";

export abstract class BaseEnemy extends BaseGameObject {

    constructor(game: Phaser.Game, sprite: Phaser.Sprite) {
        super(game, sprite);
        this.resetEnemy();
    }

    resetEnemy() {
        this.active = true;
        this.sprite.renderable = true;
        this.xStartPosition();
        this.yStartPosition();
    }
    
    public deactivateEnemy(): void {
        this.active = false;
        this.sprite.renderable = false;
    }

    xStartPosition(): void {
        var halfWidth = this.sprite.width * .5;
        this.sprite.position.x = (Math.random() * Constants.gameBounds.x - halfWidth) + halfWidth;
    }

    yStartPosition(): void{
        this.sprite.position.y = 0 - this.sprite.height;
    }

    update(player: Player) {
        if (!this.active) {
            return;
        }

        if (this.sprite.position.y > this.game.height + this.sprite.height) {
            this.active = false;
        }
    }
}