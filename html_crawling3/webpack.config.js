const webpack = require('webpack');
const json = require('json-loader');

module.exports = {
    entry: [
        "./data/data.json",
        "./data/data_1001~2000.json",
        "./data/data_2001~3000.json",
        "./data/data_3001~4000.json",
        "./data/data_4001~5000.json",
        "./data/data_5001~5780.json"
    ],
    module: {
        loaders: [{
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    output: {
        filename: "./data/data.min.json"
    }
}