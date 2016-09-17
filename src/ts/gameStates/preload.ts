import { BaseState } from "./baseState";

export class Preload extends BaseState {
    
    preload(): void {
        this.load.path = "./assets/";
        this.load.image("background", 'purple.png');
        this.load.image("player", "player.png");
        this.load.image("enemy", "enemy.png");
        this.load.image("regularPlayerBullet", "regBullet.png");
    }
    
    create(): void {
        this.changeState('MainMenu', false);
    }
    
}