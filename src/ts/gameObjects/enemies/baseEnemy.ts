import { BaseGameObject } from "../baseGameObject";
import { Player } from "../player";
import { Constants } from "../../utilities/constants";
import { Shaders } from "../../utilities/shaders";

export abstract class BaseEnemy extends BaseGameObject {

    damage: number;
    health: number;
    private playHitAnimation: boolean;
    private filter: Phaser.Filter;
    private initalWhiteValue: number;

    constructor(game: Phaser.Game, sprite: Phaser.Sprite) {
        super(game, sprite);
        this.resetEnemy();
        this.health = 100;
        this.damage = 5;
        var shader = Shaders.createWhiteShader();
        this.filter = new Phaser.Filter(game, shader.uniforms, shader.text);
        this.sprite.filters = [this.filter];
        this.initalWhiteValue = 0.0;
    }

    public resetEnemy() {
        this.active = true;
        this.sprite.renderable = true;
        this.health = 100;
        this.xStartPosition();
        this.yStartPosition();
    }

    public deactivateEnemy(): void {
        this.active = false;
        this.sprite.renderable = false;
    }

    private xStartPosition(): void {
        var halfWidth = this.sprite.width * .5;
        this.sprite.position.x = (Math.random() * Constants.gameBounds.x - halfWidth) + halfWidth;
    }

    private yStartPosition(): void {
        this.sprite.position.y = 0 - this.sprite.height;
    }

    public update(player: Player) {
        if (!this.active) {
            return;
        }


        if (this.playHitAnimation) {
            this.filter.uniforms["uWhiteAmount"].value -= this.game.time.physicsElapsed;
            if (this.filter.uniforms["uWhiteAmount"].value < 0.0) {
                this.filter.uniforms["uWhiteAmount"].value = 0.0;
                this.playHitAnimation = false;
            }
        }

        if (this.sprite.position.y > this.game.height + this.sprite.height) {
            this.active = false;
        }
    }

    private setWhiteAmount(val: number): number {
        this.filter.uniforms["uWhiteAmount"].value = val;
        return val;
    }

    public hit(): void {
        this.setWhiteAmount(1.0);
        this.playHitAnimation = true;
    }
}