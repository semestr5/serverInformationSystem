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
        },
    {
        test: /\.css$/,
        loader: "style-loader!css-loader!resolve-url-loader"
    }, { test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url'
        }
        ]
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