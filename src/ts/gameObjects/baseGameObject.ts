

export class BaseGameObject {
    
    game: Phaser.Game;
    sprite: Phaser.Sprite;
    
    constructor(game: Phaser.Game, sprite: Phaser.Sprite){
        this.game = game;
        this.sprite = sprite;
    }
    
}
