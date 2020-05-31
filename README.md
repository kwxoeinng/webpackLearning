# webpackLearning
实现开发环境和生产环境下的webpack配置。保留一个 "common(通用)" 配置，使用webpack-merge 的工具，将其与“dev（开发）”和“pro（生产）”配置合并在一起，这样做可以不必在配置中编写重复的代码。
## 使用步骤
### 安装依赖
- 安装npm依赖：`npm install`
### 开发环境
- 启动项目：`npm start`
- 浏览器预览：localhost:3000
### 生产环境
打包：`npm run build`
## config
### webpack.common.js
 - entry（入口）
 - output（出口）
- loader
  * url-loader、html-loader、file-loader
### webpack.dev.js
 - ```mode: 'development'```（模式）
 - ```devtool: 'cheap-module-eval-source-map/eval-source-map'```(代码调试)
 - devServer
- loader
  * style-loader、css-loader、(less-loader)
- plugin
  * HtmlWebpackPlugin
### webpack.prod.js
该环境下完成操作：提取CSS成单独文件、压缩CSS、CSS兼容性、压缩html代码、压缩JS、JS兼容性
 - ```mode: 'production'```（模式）
 - ```devtool: 'source-map/cheap-module-source-map'```(代码调试)
 - devServer
- loader
  * MiniCssExtractPlugin.loader、css-loader、postcss-loader、(less-loader)、eslint-loader、babel-loader
- plugin
  * MiniCssExtractPlugin、OptimizeCssAssetsWebpackPlugin、HtmlWebpackPlugin
## 性能优化（未完成）
