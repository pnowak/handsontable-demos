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
