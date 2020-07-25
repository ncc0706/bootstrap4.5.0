const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    // mode: "production",
    // devtool: "inline-source-map",
    devtool: 'source-map',
    entry: "./src/index.ts",
    output: {
        filename: "app.js",
        path: path.join(__dirname, "/dist")
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {test: /\.tsx?$/, loader: "ts-loader"},
            {
                // 增加对SCSS文件的支持,
                // test: /\.scss/,
                // SCSS文件的处理顺序为先sass-loader，再css-loader，再style-loader
                // use: ["style-loader", "css-loader", "sass-loader"]

                // css sass scss
                // test: /\.s?[ac]ss$/,

                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }, {
                test: /\.(woff|woff2|svg|ttf|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts'
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Typescript In Action",
            template: path.join(__dirname, "./src/index.html"),
            filename: "index.html",
        }),
        new MiniCssExtractPlugin({
            // 类似 webpackOptions.output里面的配置 可以忽略
            filename: '[name].[hash].css',
            chunkFilename: "app.css"
        }),
        new CleanWebpackPlugin(),
    ],
};
