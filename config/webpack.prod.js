const {resolve} = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// 提取css成单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 定义 nodejs 环境变量：决定使用 browserslist 的哪个环境 
process.env.NODE_ENV = 'production';
// 复用 loader
const commonCssLoader = [
    // 这个loader取代style-loader。作用：提取js中的css成单独文件
    MiniCssExtractPlugin.loader,
    'css-loader',
    // css 兼容性处理
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()
            ]
        }
    }
];
module.exports = merge(common, {
    // 生产环境下会自动压缩 js 代码
    mode: 'production',
    module: {
        rules: [{
                test: /\.css$/,
                use: [...commonCssLoader]
            },
            {
                test: /\.less$/,
                use: [...commonCssLoader, 'less-loader']
            },
            /*正常来讲，一个文件只能被一个 loader 处理。 
            当一个文件要被多个 loader 处理，那么一定要指定loade执行的先后顺序：
            先执行 eslint 在执行 babel */
            {
                /*
                语法检查： eslint-loader eslint 
                注意：只检查自己写的源代码，第三方的库是不用检查的 
                设置检查规则： package.json 中 eslintConfig 中设置~
                 "eslintConfig": {
                      "extends": "airbnb-base",
                       "env": { 
                           "browser": true
                         }
                }
                 airbnb --> eslint-config-airbnb-base eslint-plugin-import eslint 
                 */
                // 在 package.json 中 eslintConfig --> airbnb 
                test: /\.js$/,
                exclude: /node_modules/,
                // 优先执行 enforce: 'pre', 
                loader: 'eslint-loader',
                options: {
                    // 自动修复 eslint 的错误
                    fix: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    // 预设：指示 babel 做怎么样的兼容性处理
                    presets: [
                        ['@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns: 'usage',
                                // 指定 core-js 版本
                                corejs: {
                                    version: 3
                                },
                                // 指定兼容性做到哪个版本浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '50'
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 对输出的 css 文件进行重命名
            filename: 'css/built.css'
        }),
        // 压缩 css
        new OptimizeCssAssetsWebpackPlugin(),
        new HtmlWebpackPlugin({
            // 压缩 html 代码
            template: resolve(__dirname, '../src/index.html'),
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        })
    ],
});