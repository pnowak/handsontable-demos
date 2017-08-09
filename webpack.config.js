const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
  {
    entry: `${__dirname}/src/index.js`,
    output: {
      path: `${__dirname}/dist`,
      filename: 'bundle.js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['env'],
          },
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: `${__dirname}/src/index.html`,
        to: `${__dirname}/dist/index.html`,
      }]),
    ],
    stats: {
      colors: true,
    },
    resolve: {
      alias: {
        amcharts: path.resolve('./node_modules/amcharts3/amcharts/amcharts.js'),
      },
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/,
    },
  },
];
