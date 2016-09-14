


/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

import 'pixi';
import 'p2';
import 'phaser';

import { Constants } from "./utilities/constants";
import { Boot } from "./gameStates/boot";
import { MainMenu } from "./gameStates/mainMenu";
import { Preload } from "./gameStates/preload";



class GameEngine extends Phaser.Game {
    constructor() {
        super(Constants.gameBounds().x, Constants.gameBounds().y, Phaser.AUTO, 'content', null);

        this.state.add('Boot', Boot, false);
        this.state.add('Preload', Preload, false);
        this.state.add('MainMenu', MainMenu, false);

        this.state.start('Boot'); 
    }
}

window.onload = () => {
    var game = new GameEngine();
}







