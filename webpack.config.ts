import path from 'path';
// in case you run into any typescript error when configuring `devServer`

const config = {
    name: 'server',
    entry: './server/index.ts',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist/server'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};

export default config;