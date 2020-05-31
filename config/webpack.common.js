/*
    所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs
*/
// resolve 用来拼接绝对路径的方法
const {
    resolve
} = require('path');
module.exports = {
    // 入口
    entry: resolve(__dirname, '../src/js/index.js'),
    // 输出
    output: {
        // 输出文件名
        filename: 'js/built.js',
        // 输出路径
        // __dirname nodejs 的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname, '../dist')
    },
    // loader的配置
    module: {
        rules: [{
                // 处理图片资源
                test: /\.(jpeg|jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    // 给图片进行重命名 
                    // [hash:10]取图片的hash的前10位 
                    // [ext]取文件原来扩展名
                    name: '[hash:10].[ext]',
                    // 图片大小小于 8kb，就会被base64处理 
                    // 优点: 减少请求数量（减轻服务器压力） 
                    // 缺点：图片体积会更大（文件请求速度更慢）
                    limit: 8 * 1024,
                    // 问题：因为url-loader默认使用es6模块化解析，而 tml-loader引入图片是commonjs 
                    // 解析时会出问题：[object Module] 
                    // 解决：关闭url-loader的es6模块化，使用commonjs解析
                    esModule: false,
                    outputPath: 'images'
                }
            },
            {
                // 处理 html 中 img 资源
                test: /\.html$/,
                // 负责引入img，从而能被url-loader进行处理
                loader: 'html-loader'
            },
            {
                // 处理其他资源
                exclude: /\.(html|js|css|less|jpeg|jpg|png|gif)/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    }
}