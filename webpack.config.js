const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './public/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  node: { fs: 'empty' },
  plugins: [
    new Dotenv()
  ]
};