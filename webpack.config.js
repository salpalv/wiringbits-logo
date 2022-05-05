// @ts-check
/** @typedef { import('webpack').Configuration } Configuration*/

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/** @returns { Configuration } */
module.exports = (env, argv) => {
    const mode = argv.mode
    const isDevelopment = mode === "development"
    return {
        target: 'web',
        mode: isDevelopment ? 'development' : 'production',
        entry: './src/index.ts',
        devtool: 'inline-source-map',
        devServer: {
            hot: true,
            static: './dist',
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "src/index.html",
                inject: false
            })
        ],
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: ['ts-loader']
                },
                {
                    test: /\.s?css$/i,
                    use: [
                        // puts css inline
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                }
            ],
        }
    }
}