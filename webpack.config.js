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
  'sass?includePaths[]=' + path.resolve(__dirname, './src/stylesheets')
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
    extensions: ['', '.jsx', '.js', '.scss', '.css'],
    modulesDirectories: ['src/javascripts', 'src/stylesheets', 'node_modules']
  },
  module: {
    loaders: [
      { test:
        /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', sassLoaders.join('!')) },
      { test: /\.eot$/,  loader: 'url' },
      { test: /\.woff2?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf$/,  loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg$/,  loader: 'url?limit=10000&mimetype=image/svg+xml' },
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
  ],
  node: {
    fs: 'empty'
  }
};
