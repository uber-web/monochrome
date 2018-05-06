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
            presets: ['@babel/es2015', '@babel/react', ['@babel/stage-2', {decoratorsLegacy: true}]]
          }
        }
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

// This line enables bundling against src in this repo rather than installed deck.gl module
module.exports = CONFIG;
