const {
    resolve
} = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require('./webpack.common.js');
const devServer = {
    // 项目构建后路径
    contentBase: resolve(__dirname, '../dist'),
    // 启动 gzip 压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true
}
module.exports = merge(common, {
    //模式
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer,
    module: {
        rules: [{
                // 处理 css 资源
                test: /\.css$/,
                // use 数组中 loader 执行顺序：从右到左，从下到上 依次执行 
                // 创建 style 标签，将 js 中的样式资源插入进行，添加到 head 中生效
                // 将 css 文件变成 commonjs 模块加载 js 中，里面内容是样式字符串
                use: ['style-loader', 'css-loader']
            },
            {
                // 处理 less 资源
                test: /\.less$/,
                // 将 less 文件编译成 css 文件
                use: ['style-loader', 'css-loader', 'less-loader']
            },
        ]
    },
    // plugins的配置
    plugins: [
        // 功能：默认会创建一个空的 HTML，自动引入打包输出的所有资源（JS/CSS）
        new HtmlWebpackPlugin({
            // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
            template: resolve(__dirname, '../src/index.html')
        })
    ],
});