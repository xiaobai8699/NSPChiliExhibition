const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",

  entry: "./src/ts/app.ts",

  output: {
    filename: "app.js",
    path: __dirname + "/dist"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  devServer: {
    contentBase: "./dist",
    index: "app.html"
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  plugins: [
    new CopyPlugin([
      {
        from: "./src",
        to: ".",
        ignore: ["*.ts"]
      }
    ])
  ]
};
