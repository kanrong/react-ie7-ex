module.exports = {
  entry: [
    "es5-shim",
    "es5-shim/es5-sham",
    './entry.js'
    ],
  output: 'bundle.js',
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['es3ify-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      }
    ],
  },
};
