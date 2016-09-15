
import { GameObjectFactory } from "../utilities/gameObjectFactory";

export class BaseState extends Phaser.State {

    gameObjectFactory: GameObjectFactory;

    init(gameObjectFactory: GameObjectFactory): void {
        this.gameObjectFactory = gameObjectFactory;
    }

    changeState(state: string, clearCache: boolean = true): void {
        this.game.state.start(state, true, clearCache, this.gameObjectFactory);
    }


}