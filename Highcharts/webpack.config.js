var path = require('path');
var webpack = require('webpack');

module.exports = [
    {
        entry: __dirname + '/src/app.js',
        output: {
            path: __dirname + '/dist', 
            filename: 'bundle.js',
        },
        externals: {
            'handsontable': {
                root: 'Handsontable',
                commonjs2: 'handsontable',
                commonjs: 'handsontable',
                amd: 'handsontable',
                umd: 'handsontable'
            }
        },
        module: {
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
        stats: {
            // Nice colored output
            colors: true
        }
    }
];