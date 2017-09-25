'use strict'
const path = require('path')

module.exports = {
  target: "node",
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map'
};
