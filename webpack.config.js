const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

var config = {
  // mode: "development",

  mode: "production",

  entry: "./src/ts/App.ts",

  output: {
    filename: "app.js",
    path: __dirname + "/dist"
  },

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
    ]),

    new CleanWebpackPlugin()
  ]
};

module.exports = (env, argv) => {
  
  if (argv.mode == "development") {
    // Enable sourcemaps for debugging webpack's output.
    config.devtool = "source-map";
  }

  return config;
};
