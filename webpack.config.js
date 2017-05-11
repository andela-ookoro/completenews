const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const debug = process.env.NODE_ENV !== 'production';
const basePlugins = [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.$': 'jquery',
    'window.jQuery': 'jquery',
  }),
  new Dotenv({
    path: '.env',
    safe: true,
  }),
];
const debugPlugins = [new ExtractTextPlugin('style.css')];
const productionPlugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  new ExtractTextPlugin({ filename: '/src/style.css', allChunks: true }),
];

const plugins = debug ?
  debugPlugins.concat(basePlugins) : productionPlugins.concat(basePlugins);

module.exports = {
  context: path.join(__dirname, '/src/'),
  devtool: debug ? 'inline-sourcemap' : null,
  entry: ['./js/client.jsx', './scss/main.scss'],
  devServer: {
    inline: true,
    port: process.env.PORT || 1142,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy',
            'transform-class-properties'],
        },
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?importLoaders=1',
        }),
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.json$/, loader: 'json-loader',
      },
      {
        test: /react-icons\/(.)*(.js)$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  output: {
    path: path.join(__dirname, '/src/'),
    filename: 'client.min.js',
  },
  plugins,
};
