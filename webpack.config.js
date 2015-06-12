const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const colorRgbaFallback = require('postcss-color-rgba-fallback');
const WebpackNotifierPlugin = require('webpack-notifier');

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
});

const sassLoaders = [
  'css?sourceMap',
  'postcss',
  'sass?includePaths[]=' + path.resolve(__dirname, './src/css')
];

module.exports = {
  entry: './src/main.js',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  debug: true,
  resolve: {
    extensions: ['', '.jsx', '.js', '.scss'],
    modulesDirectories: ['src', 'node_modules']
  },
  module: {
    loaders: [
      { test:
        /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', sassLoaders.join('!')) },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss') }
    ]
  },
  postcss: [
    autoprefixer(),
    colorRgbaFallback()
  ],
  plugins: [
    definePlugin,
    new WebpackNotifierPlugin(),
    new ExtractTextPlugin('bundle.css')
  ]
};
