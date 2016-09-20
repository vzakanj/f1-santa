
import { BaseGameObject } from "./baseGameObject";
import { Constants } from "../utilities/constants";

export class Player extends BaseGameObject {

    private speed: number;
    private keys: {
        [id: string]: Phaser.Key[]
    }
    private idleAnimation: Phaser.Animation;
    private movingLeftAnimation: Phaser.Animation;
    private movingRightAnimation: Phaser.Animation;
    private movingRight: boolean;
    private movingLeft: boolean;


    constructor(game: Phaser.Game, sprite: Phaser.Sprite) {
        super(game, sprite);
        this.speed = Constants.playerSpeed;
        this.keys = {
            'up': this.addKeys(Phaser.KeyCode.UP, Phaser.KeyCode.W),
            'down': this.addKeys(Phaser.KeyCode.DOWN, Phaser.KeyCode.S),
            'left': this.addKeys(Phaser.KeyCode.LEFT, Phaser.KeyCode.A),
            'right': this.addKeys(Phaser.KeyCode.RIGHT, Phaser.KeyCode.D),
            'shoot': this.addKeys(Phaser.KeyCode.SPACEBAR)
        };
        this.sprite.body.collideWorldBounds = true;
    }

    private addKeys(...keys: number[]): Phaser.Key[] {
        var keyCodes: Phaser.Key[] = [];
        keys.forEach((key) => {
            keyCodes.push(this.game.input.keyboard.addKey(key));
        });

        return keyCodes;
    }

    private playerMovement(): void {
        if (this.isKeyDown('up')) {
            this.sprite.body.velocity.y = -this.speed;
        } else if (this.isKeyDown('down')) {
            this.sprite.body.velocity.y = this.speed;
        } else {
            this.sprite.body.velocity.y = 0;
        }

        if (this.isKeyDown('right') && !this.movingRight) {
            this.movingRight = true;
            this.movingLeft = false;
            this.sprite.body.velocity.x = this.speed;
            this.movingRightAnimation.play();
        } else if (this.isKeyDown('left') && !this.movingLeft) {
            this.movingLeft = true;
            this.movingRight = false;
            this.sprite.body.velocity.x = -this.speed;
            this.movingLeftAnimation.play();
        } else {
            if (this.areKeysUp('left') && this.areKeysUp('right')) {
                this.movingLeft = false;
                this.movingRight = false;
                this.sprite.body.velocity.x = 0;
                this.idleAnimation.play();
            }
        }
    }

    public setIdleAnimation(index: number[], fps: number = 15): void {
        this.idleAnimation = this.sprite.animations.add('idle', index, fps, false);
    }

    public setMovingLeftAnimation(index: number[], fps: number = 15): void {
        this.movingLeftAnimation = this.sprite.animations.add('left', index, fps, false);
    }

    public setMovingRightAnimation(index: number[], fps: number = 15): void {
        this.movingRightAnimation = this.sprite.animations.add('right', index, fps, false);
    }

    public update(): void {
        this.playerMovement();
    }

    public bindKey(key: string, ...keys: number[]): void {
        for (var k of keys) {
            this.keys[key].push(this.game.input.keyboard.addKey(k));
        }
    }

    public isKeyDown(key: string): boolean {
        return this.keys[key].some((key: Phaser.Key) => {
            return key.isDown;
        });
    }

    public areKeysUp(key: string): boolean {
        return this.keys[key].every((key: Phaser.Key) => {
            return key.isUp;
        });
    }

}