const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnext = require('cssnext');
const postcssMixins = require('postcss-mixins');
const postcssNested = require('postcss-nested');
const path = require('path');

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
});

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?&includePaths[]=' + path.resolve(__dirname, './src/css'),
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
  // postcss: [
  //   postcssMixins,
  //   postcssNested,
  //   cssnext({
  //     import: {
  //       path: ['node_modules', 'src/css']
  //     }
  //   })
  // ],
  plugins: [
    definePlugin,
    new ExtractTextPlugin('bundle.css')
  ]
};