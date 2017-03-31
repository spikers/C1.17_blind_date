const { resolve } = require('path');

module.exports = {
    entry: [
        './index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    context: resolve(__dirname, 'src'),
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [ 'babel-loader' ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader?modules', 'postcss-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ['url-loader?limit=8192']
            }
        ]
    }
};