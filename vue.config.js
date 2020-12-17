/*
 * @Author: Chen
 * @Date: 2020-11-13 23:46:28
 * @LastEditTime: 2020-11-13 23:59:45
 * @LastEditors: Please set LastEditors
 * @Description: vue配置页面
 * @FilePath: \人力资源管理系统\hr\vue.config.js
 */

module.exports = {
    //基本路径
    //baseUrl: './',//vue-cli3.3以下版本使用
    publicPath: './',//vue-cli3.3+新版本使用
    //输出文件目录
    outputDir: 'dist',
    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'static',
    //以多页模式构建应用程序。
    // pages: undefined,
    //是否使用包含运行时编译器的 Vue 构建版本
    // runtimeCompiler: false,
    //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
    // parallel: require('os').cpus().length > 1,
    //生产环境是否生成 sourceMap 文件，一般情况不建议打开
    // productionSourceMap: false,
    devServer: {
        // host: 'localhost',
        host: "localhost",
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器  http://172.11.11.22:8888/rest/XX/
        hotOnly: true, // 热更新
        // proxy: 'http://localhost:8000'   // 配置跨域处理,只有一个代理
        /* proxy: { //配置自动启动浏览器
            "/api": {
                target: "http://182.92.157.186:8080",
                changeOrigin: true,
                ws: false,//websocket支持
                pathRewrite: {
                    '^/api': ''
                }
                // secure: false
            }
        } */
    },

};