const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack');

module.exports = (env, argv) => ({

    mode: argv.mode === 'production' ? 'production' : 'development',

    devtool: argv.mode === 'production' ? false : 'inline-source-map',

    entry: {
        ui: './src/ui.tsx',
        code: './src/code.ts',
    },

    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },

            { test: /\.css$/, use: ['style-loader', { loader: 'css-loader' }] },

            { test: /\.(png|jpg|gif|webp|svg)$/, loader: 'url-loader' },
        ],
    },

    resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },

    output: {
        publicPath: '/',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'), 
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/ui.html',
            filename: 'ui.html',
            inlineSource: '.(js)$',
            chunks: ['ui'],
            inject: "body"
        }),
        new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
    ],
})