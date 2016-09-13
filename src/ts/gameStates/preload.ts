

export class Preload extends Phaser.State {
    
    preload(): void {
        this.load.image('background', './assets/purple.png');
    }
    
    create(): void {
        this.game.state.start('MainMenu');
    }
    
}