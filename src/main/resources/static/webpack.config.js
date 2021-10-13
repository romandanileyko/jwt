var packageJSON = require('./package.json');
var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devtool: 'source-map',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'generated'),
        publicPath: '/generated/',
        filename: 'app-bundle.js'
    },
    resolve: {
        extensions:
            ['.js', '.jsx', 'ts', 'tsx']
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true}),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/env', '@babel/react']
                        },
                    },
                ],
            }
        ]
    },
    devServer: {
        static: path.join(__dirname, "generated"),
        historyApiFallback: true,
        port: 8000,
        open: true,
        hot: true
    }
}
