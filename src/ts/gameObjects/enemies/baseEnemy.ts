import { BaseGameObject } from "../baseGameObject";
import { Player } from "../Player";
import { Constants } from "../../utilities/constants";

export abstract class BaseEnemy extends BaseGameObject {

    constructor(game: Phaser.Game, sprite: Phaser.Sprite) {
        super(game, sprite);
        this.resetEnemy();
    }

    abstract resetEnemy(): void;

    xStartPosition(): void {
        var halfWidth = this.sprite.width * .5;
        this.sprite.position.x = (Math.random() * Constants.gameBounds().x - halfWidth) + halfWidth;
    }

    yStartPosition(): void{
        this.sprite.position.y = 0 - this.sprite.height;
    }

    update(player: Player) {
        if (!this.active) {
            return;
        }

        if (this.sprite.position.y + this.sprite.height > this.game.height) {
            this.active = false;
        }
    }
}