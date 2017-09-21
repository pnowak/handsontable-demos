const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
  {
    entry: [
      `${__dirname}/integrations/index.js`,
    ],
    output: {
      filename: 'bundle.js',
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
    externals: {
      handsontable: 'Handsontable',
      amcharts: 'amcharts3',
      'chart.js': 'Chart',
      fusioncharts: 'FusionCharts',
      highcharts: 'Highcharts',
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'node_modules/codemirror/lib', to: '' },
        { from: 'node_modules/codemirror/mode/javascript', to: '' },
        { from: 'node_modules/codemirror/mode/css', to: '' },
        { from: 'node_modules/codemirror/lib/codemirror.css', to: '' },
        { from: 'node_modules/codemirror/theme/dracula.css', to: '' },
        { from: 'node_modules/handsontable/dist/handsontable.full.min.js', to: '' },
        { from: 'node_modules/handsontable/dist/handsontable.full.min.css', to: '' },
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
