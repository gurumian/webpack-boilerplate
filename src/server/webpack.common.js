const path = require('path');
// const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const copyFiles = require('copy-webpack-plugin');

module.exports = {
  entry: './src/server/server.ts',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new copyFiles({
      patterns: [
        { from: path.resolve(__dirname, "media"), to: 'media' }
      ]
    })
  ],
  resolve: {
    alias: {
      
    },
    extensions: ['.tsx', '.ts', '.js'],
    // fallback: {
    //     "stream": false,
    //     "crypto": false,
    //     "dgram": false,
    // },
    // extensions: [ '.ts', '.js' ],
    fallback: {
      "path": require.resolve("path-browserify")
      // "stream": require.resolve("stream-browserify"),
      // "buffer": require.resolve("buffer"),
      // "fs": false
      // "zlib": require.resolve("browserify-zlib"),
      // "https": require.resolve("https-browserify"),
      // "http": require.resolve("stream-http")

    }
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../../dist/server'),
  }
};