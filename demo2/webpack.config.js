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
    externals: {
      handsontable: 'Handsontable',
      amcharts: 'amcharts3',
      'chart.js': 'Chart',
      fusioncharts: 'FusionCharts',
      highcharts: 'Highcharts',
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
        { from: 'node_modules/handsontable/dist/handsontable.full.min.js', to: `${__dirname}/public/assets/js` },
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
