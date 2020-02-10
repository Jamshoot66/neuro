let path = require('path')

let conf = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, './src'),
    filename: 'script.js',
    publicPath: 'src/'
  },
  devServer: {
    open: false,
    port: 3000,
    overlay: {
      warnings: false,
      errors: true
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }
    ]
  }
}

module.exports = (env, options) => {
  conf.devtool =
    options.mode === 'production' ? false : 'cheap-module-eval-source-map'
  return conf
}
