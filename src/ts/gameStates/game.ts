
import { Constants } from "../utilities/constants";
import { BaseState } from "./baseState";
import { Background } from "../gameObjects/background";
import { Player } from "../gameObjects/player";
import { GameObjectFactory } from "../utilities/gameObjectFactory";
import { BaseEnemy } from "../gameObjects/enemies/baseEnemy";

export class Gameplay extends BaseState {

    background: Background;
    player: Player;
    enemies: BaseEnemy[];

    create(): void {

        // Background
        this.background = this.gameObjectFactory.createBackground();
        this.background.tileSprite.autoScroll(Constants.backgroundMovement().x, Constants.backgroundMovement().y);

        // Player
        this.player = this.gameObjectFactory.createPlayer();
    }
    
    update(): void{
        this.player.update();
    }
}