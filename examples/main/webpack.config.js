const {resolve} = require('path');
const webpack = require('webpack');

const CONFIG = {
  entry: {
    app: resolve('./src/index.js')
  },
  devtool: 'source-maps',
  output: {
    path: resolve('./dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      monochrome: resolve(__dirname, '../../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/flow', '@babel/react'],
            plugins: ['@babel/proposal-class-properties']
          }
        }
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

// This line enables bundling against src in this repo rather than installed deck.gl module
module.exports = CONFIG;
