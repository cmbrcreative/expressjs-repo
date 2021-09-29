const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = (env) => {
  return {
    target: "node",
    externals: [nodeExternals()],
    entry: {
      index: path.resolve(__dirname, "src/index.ts"),
    },
    devtool: "source-map",
    output: {
      filename: "[name].js",
    },
    optimization: {
      minimize: false,
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, "src"),
      },
      extensions: [".js", ".ts", ".json"],
    },
    module: {
      rules: [
        {
          test: /(\.ts)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
        },
      ],
    },
  };
};
