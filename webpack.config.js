var webpack               = require('webpack');

var webpackConfig = {
  entry: {
    app: [
      './src/index.js'
    ]
  },
  output: {
    path: './dist',
    filename: 'react-flexbox-layout.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};


module.exports = webpackConfig;
