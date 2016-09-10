

import 'pixi';
import 'p2';
import 'phaser';
import { Boot } from "./gameStates/boot";

    class GameEngine extends Phaser.Game {
        constructor() {
            super(800, 600, Phaser.AUTO, 'content', null);
            
            this.state.add('Boot', Boot, false);
            // this.state.add('Preloader', Preload, false);
            // this.state.add('MainMenu', MainMenu, false);

            this.state.start('Boot');
        }
    }

window.onload = () => {
    var game = new GameEngine();
}







