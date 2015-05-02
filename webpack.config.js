const webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: './leancloud/public',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.jsx', '.js'],
    modulesDirectories: ["src", "node_modules"]
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ }
    ]
  }
};