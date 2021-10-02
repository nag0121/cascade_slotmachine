const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  entry: {
    game: [`${__dirname}/src/index.ts`],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean : true
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../dist/index.html',
      template: `${ __dirname }/src/index.html`,
      chunks: ['game'],
      hash: true,
      inject : 'body'
    }),
    new CopyPlugin({
      patterns: [
        {from: "./src/assets", to: path.resolve(__dirname, 'dist/assets')}
      ]
    })
  ],
  
};