
///<reference path='../../../node_modules/phaser/typescript/phaser.d.ts'/>
///<reference path='../../../src/ts/gameStates/Boot.ts'/>


class Game extends Phaser.Game {
    constructor() {
        super(800, 600, Phaser.AUTO, 'content', null);

        this.state.add('Boot', Boot, false);
        // this.state.add('Preloader', Preload, false);
        // this.state.add('MainMenu', MainMenu, false);

        this.state.start('Boot');
    }
}


