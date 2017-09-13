const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development',
});
module.exports = [
  {
    entry: [
      `${__dirname}/public/index.js`,
      `${__dirname}/public/main.sass`,
      `${__dirname}/node_modules/handsontable/dist/handsontable.full.min.css`,
    ],
    output: {
      path: `${__dirname}/public/dist`,
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
        {
          test: /\.sass$/,
          use: extractSass.extract({
            use: [{
              loader: 'css-loader',
            }, {
              loader: 'sass-loader',
            }],
            fallback: 'style-loader',
          }),
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('styles.css'),
    ],
    stats: {
      colors: true,
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/,
    },
  },
];
