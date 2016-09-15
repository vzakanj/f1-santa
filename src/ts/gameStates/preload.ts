import { BaseState } from "./baseState";

export class Preload extends BaseState {
    
    preload(): void {
        this.load.image("background", './assets/purple.png');
    }
    
    create(): void {
        this.changeState('MainMenu', false);
    }
    
}