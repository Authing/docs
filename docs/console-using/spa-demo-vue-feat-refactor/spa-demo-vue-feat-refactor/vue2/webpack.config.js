const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

function resolve (dir) {
  return path.resolve(__dirname, './', dir)
}

module.exports = {
  mode: 'none',
  entry: resolve('./index.js'),
  output: {
    path: resolve('dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      '@': resolve('./src/')
    },
    extensions: ['.vue', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.js$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ],
              plugins: [ 
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-transform-runtime'
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
    historyApiFallback: true,
    proxy: {
      '/oidc/token/introspection': {
        target: 'https://spa-demo-2022.authing.cn',
        secure: false,
        changeOrigin: true
      }
    },
    setup (app, server) {
      app.post('/oidc/token/introspection', (req, res) => {
        res.json({
          a: 'setup-middlewares option GET'
        })
      })
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('./index.html'),
      filename: 'index.html'
    }),
    new VueLoaderPlugin()
  ]
}
