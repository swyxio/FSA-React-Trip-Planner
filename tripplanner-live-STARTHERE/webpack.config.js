var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: ["./client/index.js", "./client/style.scss"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "public/"
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "public/bundle.css",
      allChunks: true
    })
  ]
};
