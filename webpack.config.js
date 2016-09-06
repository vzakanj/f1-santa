var path = require('path');


var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    context: path.resolve(__dirname, 'src/ts'),
    entry: './app.ts',
    target: 'web',
    devtool: 'sourcemap',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    inline: true,
    devServer: {
        // This is required for webpack-dev-server if using a version <3.0.0.
        // The path should be an absolute path to your build destination.
        contentBase: path.resolve(__dirname, 'dist'),
        inline: true
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        }
    },
    module: {
        loaders: [
            { test: /pixi\.js/, loader: 'expose?PIXI' },
            { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
            { test: /p2\.js/, loader: 'expose?p2' },
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
    watch: true,
    watchOptions: {
        poll: true
    },
}