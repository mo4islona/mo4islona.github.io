const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
index.html  410 bytes          [emitted]
   main.js   6.72 KiB       0  [emitted]         main
runtime.js   8.44 KiB       1  [emitted]         runtime
vendors.js   2.19 MiB
 */
module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: [
    'react-hot-loader/patch', // activate HMR for React
    'webpack-dev-server/client?http://localhost:8080', // bundle the client for webpack-dev-server and connect to the provided endpoint
    'webpack/hot/only-dev-server', // bundle the client for hot reloading, only- means to only hot reload for successful updates
    './index.jsx', // the entry point of our app
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      output: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
  ],
  performance: {
    hints: false,
  },
  devServer: {
    hot: true,
  },
  devtool: 'cheap-module-eval-source-map',
};
