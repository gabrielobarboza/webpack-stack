const Path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const Source = Path.resolve(__dirname , 'src') 
const Assets = Path.join(__dirname, 'assets')

const App = Path.join(Source, 'App')
const Styles = Path.join(Assets, 'styles')

const config  = {
    entry: Path.join(App, 'index.js'),
    output: {
        path: Path.join(__dirname , 'dist'),
        filename: Path.join('assets' , 'bundle.js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ 'css-loader', 'postcss-loader', 'sass-loader' ]
                })
            },
            {
                // test: /\.(jpe?g|png|gif)$|fonts\/.*\.(ttf|eot|woff|woff2|svg)$/i,
                test: /\.(jpe?g|png|gif|ttf|eot|woff|woff2|svg)$/i,
                exclude: /node_modules/,                
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[path][name].[ext]",
                    },
                }
            },
            {
                test: /svgc\/.*\.svgc$/,
                exclude: /node_modules/,                
                use : {
                    loader: 'svg-react-loader'
                }
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,                
                use: {
                    loader: 'json-loader'
                }
            }
        ]
    },
    devServer: {
        contentBase: Path.join(__dirname, "dist"),
        compress: true,
        port: 9090
    },
    plugins: [
        new CleanWebpackPlugin(['./dist']),
        new ExtractTextPlugin({
            filename: "./assets/main.css",
            allChunks: true,
            disable: true
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ],
    resolve: {
        alias: {
            App,
            Assets,
            Styles
        }
    }
};

module.exports = config