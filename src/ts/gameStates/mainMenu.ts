
import { Constants } from "../utilities/constants";

export class MainMenu extends Phaser.State {

    menuReady: boolean = false;
    background: Phaser.TileSprite = null;

    create(): void {
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
        
        var menuText = this.game.add.text(this.game.world.centerX, this.game.world.height - 200, "Press any key to start", Constants.mainMenuFontStyle());

        var textAnimation = this.game.add.tween(menuText).from({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
        var backgroundAnimation = this.game.add.tween(this.background).from({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
        backgroundAnimation.onComplete.add(function () {
            this.menuReady = true;
        }, this);
      
         

    }
} 