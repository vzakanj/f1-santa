
import { BaseGameObject } from "./baseGameObject";
import { Constants } from "../utilities/constants";

export class Player extends BaseGameObject {

    speed: number;
    keys: {
        [id: string]: Phaser.Key[]
    }

    constructor(game: Phaser.Game, sprite: Phaser.Sprite) {
        super(game, sprite);
        this.speed = Constants.playerSpeed();
        this.keys = {
            'up': this.addKeys(Phaser.KeyCode.UP, Phaser.KeyCode.W),
            'down': this.addKeys(Phaser.KeyCode.DOWN, Phaser.KeyCode.S),
            'left': this.addKeys(Phaser.KeyCode.LEFT, Phaser.KeyCode.A),
            'right': this.addKeys(Phaser.KeyCode.RIGHT, Phaser.KeyCode.D)
        };
        this.sprite.body.collideWorldBounds = true;
    }

    update(): void {
        this.playerMovement();
    }

    addKeys(...keys: number[]): Phaser.Key[] {
        var keyCodes: Phaser.Key[] = [];
        keys.forEach((key) => {
            keyCodes.push(this.game.input.keyboard.addKey(key));
        });

        return keyCodes;
    }

    playerMovement(): void {
        if (this.isKeyDown('up')) {
            this.sprite.body.velocity.y = -this.speed;
        } else if (this.isKeyDown('down')) {
            this.sprite.body.velocity.y = this.speed;
        }else{
            this.sprite.body.velocity.y = 0;
        }

        if (this.isKeyDown('right')) {
            this.sprite.body.velocity.x = this.speed;
        } else if (this.isKeyDown('left')) {
            this.sprite.body.velocity.x = -this.speed;
        }else{
            this.sprite.body.velocity.x = 0;
        }

    }

    isKeyDown(key: string): boolean {
        return this.keys[key].some((key: Phaser.Key) => {
            return key.isDown;
        });
    }

    areKeysUp(key: string): boolean {
        return this.keys[key].every((key: Phaser.Key) => {
            return key.isUp;
        });
    }

}