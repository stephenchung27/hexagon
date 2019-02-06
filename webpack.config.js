module.exports = {
  entry: './assets/js/game.js',
  output: {
    filename: './bundle.js'
  },
  resolve: {
    extensions: ['.js', '*']
  },
  devtool: 'source-map'
};