var path = require('path');
var merge = require('merge');

var config = require('./webpack.config.js');

var configUpdate = {
    devtool: 'sourcemap',
    devServer: {
        // This is required for webpack-dev-server if using a version <3.0.0.
        // The path should be an absolute path to your build destination.
        contentBase: path.resolve(__dirname, 'dist'),
        inline: true
    },
    watch: true,
    watchOptions: {
        poll: true
    }
};

var devConfig = merge(config, configUpdate);

module.exports = devConfig;