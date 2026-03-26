const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    sample: './src/index.js',
    source: './src/index.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: '[name]/bin/index.js',
    path: path.resolve(__dirname, '../')
  }
};