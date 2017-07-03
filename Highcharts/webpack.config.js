module.exports = [
    {
        devtool: 'source-map',
        entry: __dirname + '/src/app.js',
        output: {
            path: __dirname + '/dist', 
            filename: '/bundle.js',
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
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