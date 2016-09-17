var path = require('path');
var merge = require('merge');
var webpack = require('webpack');

var config = require('./webpack.config.js');

// TODO: add minification
var configUpdate = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};

var config = merge(config, configUpdate);

module.exports = config;