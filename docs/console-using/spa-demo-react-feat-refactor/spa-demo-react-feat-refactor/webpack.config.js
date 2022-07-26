const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.resolve(__dirname, './', dir)
}

module.exports = {
  mode: 'development',
  devtool: 'nosources-source-map',
  entry: resolve('./index.jsx'),
  output: {
    path: resolve('dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      '@': resolve('./src/')
    },
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-transform-runtime"
              ]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('./index.html'),
      filename: 'index.html'
    })
  ]
}
