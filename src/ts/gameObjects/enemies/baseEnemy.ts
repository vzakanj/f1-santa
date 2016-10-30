import { BaseGameObject } from "../baseGameObject";
import { Player } from "../player";
import { Constants } from "../../utilities/constants";
import { Shaders } from "../../utilities/shaders";
import { BaseEnemyBullet } from "../enemyBullets/baseEnemyBullets";
import { ExtendedArray, Predicate } from "../../utilities/extendedArray";
import {Gameplay } from "../../gameStates/game";
import { BulletTypes  } from "../../utilities/gameObjectFactory";

export abstract class BaseEnemy extends BaseGameObject {

    damage: number;
    health: number;
    private filter: Phaser.Filter;
    private initalWhiteValue: number;
    protected gamePlayState: Gameplay;
    protected timeToSpawn: number;
    protected spawnBulletTime: number;

    constructor(game: Phaser.Game, sprite:Phaser.Sprite , gamePlayState: Gameplay) {
        super(game, sprite);
        this.gamePlayState = gamePlayState;
        this.health = 100;
        this.timeToSpawn = 0;
        this.damage = 5;
        // Don't use shader, it's causing huge performance hit
        this.initalWhiteValue = 0.0;
        this.resetEnemy();
        this.spawnBulletTime = 1000;
        this.sprite.tint = 1.0 * 0xffffff;
    }

    public resetEnemy() {
        this.active = true;
        this.sprite.renderable = true;
        this.health = 100;
        this.xStartPosition();
        this.yStartPosition();
        this.spawnBullet();
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

        if (this.sprite.position.y > this.game.height + this.sprite.height) {
            this.active = false;
        }

        this.timeToSpawn -= this.game.time.physicsElapsed;
        if(this.timeToSpawn < 0){
            this.spawnBullet();
            this.timeToSpawn = this.spawnBulletTime;
        }
    }

    private setWhiteAmount(val: number): number {
        return val;
    }

    public hit(): void {
        if (!this.active) return;
    }

    protected takeInactiveBullets(take:number, type: BulletTypes): ExtendedArray<BaseEnemyBullet> {
        return this.gamePlayState.enemyBullets.takeWhere(take, x => x.active == false && x.getBulletType() == type);
    }

    protected abstract spawnBullet(): void;
}