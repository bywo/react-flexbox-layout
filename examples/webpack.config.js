var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}

module.exports = {

  devtool: 'inline-source-map',

  entry: fs.readdirSync(__dirname).reduce(function (entries, dir) {
    var isDraft = dir.charAt(0) === '_';

    if (!isDraft && isDirectory(path.join(__dirname, dir)))
      entries[dir] = path.join(__dirname, dir, 'app.jsx');

    return entries;
  }, {}),

  output: {
    path: 'examples/__build__',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('css') }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'react-flexbox-layout': process.cwd() + '/src',
      // 'react-router/lib': process.cwd() + '/modules'
    }
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'shared' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new ExtractTextPlugin('[name].css'),
  ]

};
