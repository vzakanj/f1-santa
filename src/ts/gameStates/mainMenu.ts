
import { Constants } from "../utilities/constants";
import { GameObjectFactory } from "../utilities/gameObjectFactory";
import { BaseState } from "./baseState";

export class MainMenu extends BaseState {

    menuReady: boolean = false;
    background: Phaser.TileSprite = null;

    create(): void {
        this.background = this.gameObjectFactory.createBackground().tileSprite;
        
        var menuText = this.game.add.text(this.game.world.centerX, this.game.world.height - 200, "Press any key to start", Constants.mainMenuFontStyle());

        var textAnimation = this.game.add.tween(menuText).from({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
        var backgroundAnimation = this.game.add.tween(this.background).from({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
        backgroundAnimation.onComplete.add(function () {
            this.menuReady = true;
        }, this);
        
        this.game.input.keyboard.onPressCallback =  () => {
            if(this.menuReady){
                this.changeState('Game', false);   
            }            
        }
    }
    
    update():void {
        
    }
} 