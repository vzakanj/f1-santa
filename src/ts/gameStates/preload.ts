var purpleImg = require('assets/purple.png');
var playerImg = require('assets/player.png');
var enemyImg = require('assets/enemy.png');

import { BaseState } from "./baseState";

export class Preload extends BaseState {
    
    preload(): void {
        // this.load.path = "./assets/";
        this.load.image("background", purpleImg);
        this.load.image("player", playerImg);
        this.load.image("enemy", enemyImg);
    }
    
    create(): void {
        this.changeState('MainMenu', false);
    }
    
}