const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const rootDir = path.resolve('./');
const srcDir = path.resolve('src');
const distDir = path.resolve('docs');
const nodeModules = path.resolve('node_modules');

const development = false;

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    // Entry points.
    entry: {
        app: path.join(srcDir, 'index.js')
    },

    // Output system.
    output: {
        path: distDir,
        filename: '[name].bundle.js',
        publicPath: '/'
    },

    // Resolves modules.
    resolve: {
        extensions: [
            '.js'
        ],
        modules: [
            srcDir,
            rootDir,
            nodeModules
        ],
        // A list of module source folders.
        alias: {
            components: path.join(srcDir, 'app')
        }
    },

    // Resolve loader use postfix.
    resolveLoader: {
        moduleExtensions: ['-loader']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                use: development ? ['style', 'css'] : ExtractTextPlugin.extract({
                    fallback: 'style',
                    use: ['css']
                })
            },
            {
                test: /\.scss$/,
                use: development ? ['style', 'css', 'sass'] : ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css', 'sass']
                })
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'file?name=assets/images/css/[name].[hash].[ext]'
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?v=[\d.]+)?(\?[a-z0-9#-]+)?$/,
                loader: 'file?name=assets/fonts/[name]/[name].[ext]'
            },
            {
                test: /\.pug$/,
                loader: 'pug-html'
            },
            {
                test: require.resolve('jquery'),
                use: [
                    'expose-loader?$',
                    'expose-loader?jQuery'
                ]
            }
        ]
    },

    // Load plugins.
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),

        new HtmlWebpackPlugin({
            template: './src/index.pug'
        }),

        new ExtractTextPlugin("[name].css"),
        new CopyWebpackPlugin([
            { context: 'src/assets/images', from: '**/*.png', to: 'assets/images' },
            { context: 'src/assets/images', from: '**/*.svg', to: 'assets/images' },
            { context: 'src/assets/images', from: '**/*.ico', to: 'assets/images' }
        ]),
        new ProgressBarPlugin()
    ]
};
