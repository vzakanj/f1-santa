import { BaseGameObject } from "../baseGameObject";
import { Player } from "../player";
import { Constants } from "../../utilities/constants";
import { Shaders } from "../../utilities/shaders";
import { BaseEnemyBullet } from "../enemyBullets/baseEnemyBullets";
import { ExtendedArray, Predicate } from "../../utilities/extendedArray";
import {Gameplay } from "../../gameStates/game";

export abstract class BaseEnemy extends BaseGameObject {

    damage: number;
    health: number;
    private playHitAnimation: boolean;
    private filter: Phaser.Filter;
    private initalWhiteValue: number;
    protected bulletSpawnerEvents: ExtendedArray<Phaser.TimerEvent>;
    protected gamePlayState: Gameplay;

    constructor(game: Phaser.Game, sprite:Phaser.Sprite , gamePlayState: Gameplay) {
        super(game, sprite);
        this.gamePlayState = gamePlayState;
        this.bulletSpawnerEvents = new ExtendedArray<Phaser.TimerEvent>();
        this.health = 100;
        this.damage = 5;
        var shader = Shaders.whiteShaderData();
        this.filter = new Phaser.Filter(game, shader.uniforms, shader.text);
        this.sprite.filters = [this.filter];
        this.initalWhiteValue = 0.0;
        this.resetEnemy();
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
        this.removeBulletSpawns();
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
        if (!this.active) return;
        this.setWhiteAmount(1.0);
        this.playHitAnimation = true;
    }

    protected abstract spawnBullet(): void;
    private removeBulletSpawns(): void {
        for (var e of this.bulletSpawnerEvents) {
            this.game.time.events.remove(e);
        }
    }
}