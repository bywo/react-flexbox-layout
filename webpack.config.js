var webpack               = require('webpack');

var webpackConfig = {
  entry: {
    app: [
      './src/index.js'
    ]
  },
  output: {
    path: './dist',
    filename: 'react-flexbox-layout.js',
    library: "Layout",
    libraryTarget: "umd"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    }
  ]
};


module.exports = webpackConfig;
