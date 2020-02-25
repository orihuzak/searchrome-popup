const path = require("path");

const config = {
  entry: {
    popup: path.join(__dirname, "src/popup.jsx"),
    background: path.join(__dirname, "src/background.js")
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
          plugins: ['@babel/plugin-syntax-jsx'] // jsxパース用
          },
        }
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
    // extensions: [".ts", ".tsx", ".js"]
    extensions: [' ', '.js', '.jsx', 'json'] // 拡張子なしのimportを許可
  }
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    // config.devtool = 'inline-source-map'
    config.devtool = 'cheap-module-source-map' // chrome-extension用
  } else if (argv.mode === 'production') {

  }
  return config
};