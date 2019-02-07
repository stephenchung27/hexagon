module.exports = {
  entry: './assets/js/hexagon.js',
  output: {
    filename: './bundle.js'
  },
  resolve: {
    extensions: ['.js', '*']
  },
  devtool: 'source-map'
};