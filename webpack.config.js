var webpack = require('webpack');

var webpackConfig = {
  entry: {
    app: [
      './src/index.jsx'
    ]
  },
  output: {
    path: './',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: __dirname
  }
};


module.exports = webpackConfig;
