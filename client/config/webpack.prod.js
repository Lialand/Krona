const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const cssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new cssMinimizerPlugin(),
            new uglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                extractComments: false
            })
        ]
    },
});