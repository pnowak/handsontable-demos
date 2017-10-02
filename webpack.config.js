const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
  {
    entry: {
      amCharts: './integrations/amChartsIndex.js',
      highCharts: './integrations/highchartsIndex.js',
      fusionCharts: './integrations/fusionChartsIndex.js',
      chartJs: './integrations/chartJsIndex.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: `${__dirname}/public/assets/js`,
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
      new CopyWebpackPlugin([
        { from: 'node_modules/codemirror/mode/javascript', to: `${__dirname}/public/assets/js/codeMirror` },
        { from: 'node_modules/codemirror/mode/css', to: `${__dirname}/public/assets/js/codeMirror` },
        { from: 'node_modules/codemirror/lib/codemirror.js', to: `${__dirname}/public/assets/js/codeMirror` },
        { from: 'node_modules/codemirror/lib/codemirror.css', to: `${__dirname}/public/assets/styles` },
        { from: 'node_modules/codemirror/theme/dracula.css', to: `${__dirname}/public/assets/styles` },
        { from: 'node_modules/handsontable/dist/handsontable.full.min.css', to: `${__dirname}/public/assets/styles` },
      ]),
    ],
    stats: {
      colors: true,
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: '/node_modules/',
    },
  },
];
