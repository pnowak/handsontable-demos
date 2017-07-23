var path = require('path');
var webpack = require('webpack');

module.exports = [
    {
        entry: __dirname + '/index.js',
        output: {
            path: __dirname + '/dist',
            filename: 'bundle.js',
        },
        module: {
            noParse: [path.join(__dirname, 'node_modules/handsontable/dist/handsontable.full.js')],
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        },
        resolve: {
            alias: {
                'handsontable': path.join(__dirname, 'node_modules/handsontable/dist/handsontable.full.js')
            }
        },
        stats: {
            // Nice colored output
            colors: true
        }
    }
];
