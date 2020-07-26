const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: "development",
    // 生产模拟自动压缩js代码
    // mode: "production",
    // devtool: "inline-source-map",
    devtool: 'source-map',
    entry: "./src/index.ts",
    output: {
        filename: "js/app.js",
        path: resolve(__dirname, "dist")
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
                // use: ['style-loader', 'css-loader', 'sass-loader']
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    // options: {
                    //     esModule: true,
                    // }
                }, 'css-loader']
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
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        // url-loader默认使用es6模块解析, html-loader引入图片是commonjs
                        // 解析时会出问题,需配合html-loader使用
                        loader: 'url-loader',
                        options: {
                            outputPath: 'images',
                            limit: 10 * 1024,
                            name: '[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.html$/i,
                use: {
                    loader: 'html-loader',
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Typescript In Action",
            template: resolve(__dirname, "./src/index.html"),
            filename: "index.html",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true,
                minifyJS: true
            }
        }),
        new MiniCssExtractPlugin({
            // 类似 webpackOptions.output里面的配置 可以忽略
            filename: 'css/[name].[hash:8].css',
            chunkFilename: "[id].css"
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new CleanWebpackPlugin(),
    ],

    devServer: {
        contentBase: resolve(__dirname, 'dist'),
        // 启动gzip压缩
        compress: true,
        port: 4200,
        // 打开默认浏览器
        open: true
    }
};
