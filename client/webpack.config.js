const path = require('path');
const webpack = require('webpack');

const conf = {
    entry: {
        main: "./src/index.jsx"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: path.resolve(__dirname, 'node_modules/'),
            use: ["babel-loader"]
        }]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
        hot: true,
        historyApiFallback: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

}

module.exports = conf;