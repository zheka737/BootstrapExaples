var path = require('path');
var webpack = require('webpack');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {

    env = env || {};
    var isProd = env.NODE_ENV === 'production';

    // Setup base config for all environments
    var config = {
        mode: 'development',
        entry: {
            main: './client/js/main'
        },
        output: {
            path: path.join(__dirname, 'wwwroot/dist'),
            filename: '[name].js',
            publicPath: '/'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                'popper.js': ['Popper', 'window.Popper']
            }),
            new HtmlWebpackPlugin({
                template: 'client/index.html'
              })
        ],
        devtool: 'inline-source-map',
        devServer: {
            contentBase: 'wwwroot/dist',
            historyApiFallback: {
                index: 'client/index.html'
            }
        },
        module: {
            rules: [{
                    test: /\.css?$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: 'url-loader?limit=25000'
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/,
                    use: 'url-loader?limit=100000'
                }
            ]
        }
    }

    // Alter config for prod environment
    if (isProd) {
        config.devtool = 'source-map';
        config.plugins = config.plugins.concat([
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true
            })
        ]);
    }

    return config;
};