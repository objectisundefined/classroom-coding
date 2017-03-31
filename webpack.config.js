module.exports = {
  entry: './src/frontend/js/main.js',
  output: {
    path: './src/backend/public',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-runtime'],
          presets: ['react', 'stage-0', 'es2015']
        }
      }
    ]
  }
}
