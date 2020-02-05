const path = require("path");

const config = {
  entry: {
    popup: path.join(__dirname, "src/popup.tsx"),
    background: path.join(__dirname, "src/background.ts")
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // Creates style nodes from JS strings
          },
          {
            loader: "css-loader" // Translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // Compiles Sass to CSS
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map'
  } else if (argv.mode === 'production' ) {

  }
  return config
};