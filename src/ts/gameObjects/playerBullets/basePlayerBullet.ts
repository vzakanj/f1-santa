import { BaseGameObject } from "../baseGameObject";
import { Player } from "../Player";
import { BaseEnemy } from "../enemies/baseEnemy";
import { Constants } from "../../utilities/constants";
import { Shaders } from "../../utilities/shaders";


export class BasePlayerBullet extends BaseGameObject {

    damage: number;
    filter: Phaser.Filter;

    constructor(game: Phaser.Game, sprite: Phaser.Sprite) {
        super(game, sprite);
        this.damage = 10;
    }


    public update(): void {
        if (!this.active) return;

        if (this.sprite.position.y < 0 - this.sprite.height) {
            this.active = false;
        }
    }

    spawnBullet(pos: Phaser.Point) {
        this.active = true;
        this.sprite.position = pos;
        this.sprite.renderable = true;
    }

    deactivateBullet(): void {
        this.active = false;
        this.sprite.body.velocity = new Phaser.Point(0, 0);
        this.sprite.renderable = false;
    }
}