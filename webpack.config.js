const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnext = require('cssnext');
const postcssMixins = require('postcss-mixins');
const postcssNested = require('postcss-nested');

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
});

module.exports = {
  entry: './src/main.js',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.css'],
    modulesDirectories: ["src", "node_modules"]
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css!postcss') }
    ]
  },
  postcss: [
    postcssMixins,
    postcssNested,
    cssnext({
      import: {
        path: ['node_modules', 'src/css']
      }
    })
  ],
  plugins: [
    definePlugin,
    new ExtractTextPlugin("bundle.css")
  ]
};