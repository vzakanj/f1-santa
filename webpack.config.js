var path = require('path');


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
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
    watch: true,
    watchOptions: {
        poll: true
    }
}