const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'none',
	entry: {
		"index": './index.js'
	},
	output: {
		globalObject: 'self',
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
    devtool: "source-map",
    module: {
		rules: [
			{
				test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                },
				exclude: /node_modules/
        	},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
            {
                test: /\.ttf$/,
                use: ['file-loader']
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            }
		]
	},
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors"
                },
                monaco: {
                    test: /[\\/]monaco-editor[\\/]/,
                    name: 'monaco-editor',
                    chunks: 'all',
                    priority: 1
                }
            }
		}
    },
    plugins: [
        new CleanWebpackPlugin(['dist/*']),
        new HtmlWebpackPlugin({
            title: 'Playground',
            template: 'index.html'
        }),
        new MonacoWebpackPlugin()
    ]
};
