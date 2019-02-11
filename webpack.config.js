module.exports = {
  entry: './assets/js/hexagon.js',
  output: {
    filename: 'bundle.js',
    path: '/'
  },
  resolve: {
    extensions: ['.js', '*']
  },
  devtool: 'source-map'
};