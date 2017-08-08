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
    watch: true,
    debug: true,
  },
];
