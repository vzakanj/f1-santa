var purpleImg = require('assets/purple.png');
//var playerImg = require('assets/player.png');
var playerImg = require('assets/redfighter.png');
var enemyImg = require('assets/enemy.png');
var regularPlayerBulletImg = require('assets/regBullet.png');
var enemyBullet1 = require('assets/laserRed08.png');


import { BaseState } from "./baseState";

export class Preload extends BaseState {
    
    preload(): void {

        this.load.image("background", purpleImg);
        this.load.spritesheet("player", playerImg, 343,383);
        this.load.image("enemy", enemyImg);
        this.load.image("regularPlayerBullet",regularPlayerBulletImg);
        this.load.image("enemyBullet", enemyBullet1);

    }
    
    create(): void {
        this.changeState('MainMenu', false);
    }
    
}