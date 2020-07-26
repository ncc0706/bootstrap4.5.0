const {resolve} = require('path')
const webpack = require('webpack')
// 执行下面的命令生成 dll
// webpack --config webpack.dll.js
module.exports = {
    entry: {
        // 最终打包生产的[name] --> jquery
        // ['jquery'] --> 要打包的库是 jquery
        jquery: ['jquery']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        // 打包的库里面向外暴露出去的内容叫什么名字
        library: '[name]_[hash:8]',
    },
    plugins: [
        // 打包生产已 manifest.json --> 提供和jQuery的映射
        new webpack.DllPlugin({
                //映射库暴露出去的名字
                name: '[name]_[hash:8]',
                path: resolve(__dirname, 'dll/manifest.json')
            }
        )
    ],
    mode: "production"
}