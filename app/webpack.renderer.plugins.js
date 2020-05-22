const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = [
    new ForkTsCheckerWebpackPlugin({
        async: true,
    }),
    new CopyPlugin({
        patterns: [
            { from: 'static', to: 'public' },
            { from: 'platform_specific', to: 'platform_specific' },
        ],
    }),
];
