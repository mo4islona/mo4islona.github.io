const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: "production",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: [
    "./index.jsx", // the entry point of our app
  ],
  output: {
    path: __dirname,
    filename: "[name].build.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({template: "index.tpl.html"}),
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates

  ],
  performance: {
    hints: false,
  },
  optimization: {
    minimizer: [new TerserPlugin({ /* additional options here */ })],
  },
  devtool: "cheap-module-eval-source-map",
};
