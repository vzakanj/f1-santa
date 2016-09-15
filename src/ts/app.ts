


/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

import 'pixi';
import 'p2';
import 'phaser';

import { Constants } from "./utilities/constants";
import { Boot } from "./gameStates/boot";
import { MainMenu } from "./gameStates/mainMenu";
import { Preload } from "./gameStates/preload";
import { Gameplay } from "./gameStates/game";
import { GameObjectFactory } from "./utilities/gameObjectFactory";
import { BaseState } from "./gameStates/baseState";




class GameEngine extends Phaser.Game {
    constructor() {
        super(Constants.gameBounds().x, Constants.gameBounds().y, Phaser.AUTO, 'content', null);
        
        var gameObjectFactory = new GameObjectFactory(this);

        this.state.add('Boot',  Boot, true);
        this.state.add('Preload', Preload, false);
        this.state.add('MainMenu', MainMenu, false);
        this.state.add('Game', Gameplay, false);

        this.state.start('Boot', false, false, gameObjectFactory); 
    }
}

window.onload = () => {
    var game = new GameEngine();
}







