
import { Constants } from "../utilities/constants";
import { BaseState } from "./baseState";
import { Background } from "../gameObjects/background";
import { GameObjectFactory } from "../utilities/gameObjectFactory";

export class Gameplay extends BaseState{
    
    background: Background;
    
    create() :void{
         this.background = this.gameObjectFactory.createBackground();
         this.background.tileSprite.autoScroll(Constants.backgroundMovement().x, Constants.backgroundMovement().y);
    }   
}