
module Santa {

    export class Boot extends Phaser.State {

        preload(): void {
            this.load.image('logo', 'assets/mono.png');
        }

        create(): void {
            this.game.stage.backgroundColor = "#659CEF";
            this.scale.pageAlignHorizontally = true;

            var sprite = this.game.add.sprite(0, 0, 'logo');
        }

    }

}