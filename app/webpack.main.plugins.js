const CopyPlugin = require('copy-webpack-plugin');

module.exports = [
    new CopyPlugin({
        patterns: [{ from: 'platform_specific', to: 'platform_specific' }],
    }),
];
