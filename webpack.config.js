const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/main.js',
  output: {
    path: './leancloud/public',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.scss'],
    modulesDirectories: ["src", "node_modules"]
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass') }
    ]
  },
  plugins: [
    new ExtractTextPlugin("bundle.css")
  ]
};