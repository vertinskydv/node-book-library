const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const env = process.env.NODE_ENV || 'development';
const babelSettings = {
    extends: path.join(__dirname, '.babelrc')
};
module.exports = () => {
    const config = {
        entry: ['babel-polyfill', './myapp'],
        output: {
            filename: './bundle.js'
        },
        resolve: {
            extensions: ['.js'],
            modules: ['./sources', 'node_modules'],
            alias: {
                'jet-views': path.resolve(__dirname, './views'),
                'jet-locales': path.resolve(__dirname, './libs/webix/i18n')
            }
        },
        module: {
            rules: [
                {
                    test: /\.(svg|png|jpg|gif)$/,
                    loader: 'url-loader?limit=25000'
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract('css-loader')
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('app.css')
        ],
        watch: env === 'development',
        devtool: env === 'production' ? 'none' : 'source-map'
    };
    if (env === 'production') {
        config.module.rules.push({
            test: /\.js$/,
            enforce: 'pre',
            exclude: '/libs',
            use: [{
                loader: 'webpack-strip-blocks',
                options: {
                    blocks: ['debug'],
                    start: '/*',
                    end: '*/'
                }
            }]
        });
        config.module.rules.push({
            test: /\.js$/,
            loader: `babel-loader?${JSON.stringify(babelSettings)}`
        });
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                test: /\.js$/
            })
        );
    }
    return config;
};
