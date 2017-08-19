var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: ["./browser/index.js", "./client/style.scss"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  context: __dirname,
  devtool: "source-map",
  module: {
    rules: [
      {
        "exclude": "/node_modules/",
        "include":  __dirname + "/browser/",
        "loader": "babel-loader",
        "options": {
          "presets": ["es2015", "react"]
        },
        "test": /\.jsx?$/
      },
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
