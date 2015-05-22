const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const colorRgbaFallback = require('postcss-color-rgba-fallback');

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
});

const sassLoaders = [
  'css',
  'postcss',
  'sass?&includePaths[]=' + path.resolve(__dirname, './src/css'),
];

module.exports = {
  entry: './src/main.js',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.scss'],
    modulesDirectories: ['src', 'node_modules']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', sassLoaders.join('!')) }
    ]
  },
  postcss: [
    autoprefixer(),
    colorRgbaFallback()
  ],
  plugins: [
    definePlugin,
    new ExtractTextPlugin('bundle.css')
  ]
};