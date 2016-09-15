

import { BaseState } from "./baseState";
import { GameObjectFactory } from "../utilities/gameObjectFactory";


export class Boot extends BaseState {

    preload(): void {
        this.load.image('logo', './assets/mono-logo.png');
        this.load.image('gamelogo', './assets/cat.png');
    }

    create(): void {

        this.game.stage.backgroundColor = "#659CEF";
        this.scale.pageAlignHorizontally = true;

        var monoLogo = this.game.add.sprite(this.world.centerX, this.world.centerY, 'logo');
        monoLogo.anchor = new Phaser.Point(0.5, 0.5);
        monoLogo.alpha = 0;

        // Logo animation
        var monoLogoAnimation = this.game.add.tween(monoLogo).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true);
        monoLogoAnimation.onComplete.add(function () {

            // Game logo animation, falling
            var gameLogo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'gamelogo');
            gameLogo.anchor.set(0.5);
            var gameLogoAnimation = this.game.add.tween(gameLogo).from({ y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);
            gameLogoAnimation.onComplete.add(function () {

                // Game logo fading animation
                gameLogoAnimation.to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
                gameLogoAnimation.onComplete.add(function () {
                    gameLogo.destroy();
                    this.changeState('Preload');
                }, this);
            }, this);

        }, this);


    }

    update(): void {

    }

}




