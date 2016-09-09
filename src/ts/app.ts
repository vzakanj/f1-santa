
///<reference path='../../node_modules/phaser/typescript/pixi.d.ts'/>
///<reference path='../../node_modules/phaser/typescript/p2.d.ts'/>
///<reference path='../../node_modules/phaser/typescript/phaser.d.ts'/>

///<reference path='../../src/ts/gameStates/Boot.ts'/>


import 'pixi';
import 'p2';
import 'phaser';


window.onload = () => {
    var game = new Santa.Game();
}


/** Ne kupi iz foldera pa sam ovako napravio čisto da radi */
module Santa {

    export class Game extends Phaser.Game {
        constructor() {
            super(800, 600, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Boot, false);
            // this.state.add('Preloader', Preload, false);
            // this.state.add('MainMenu', MainMenu, false);

            this.state.start('Boot');
        }
    }

    export class Boot extends Phaser.State {

        preload(): void {
            this.load.image('logo', 'assets/cat.png');
        }

        create(): void {
            this.game.stage.backgroundColor = "#659CEF";
            this.scale.pageAlignHorizontally = true;

            var sprite = this.game.add.sprite(0, 0, 'logo');
        }

    }
}

