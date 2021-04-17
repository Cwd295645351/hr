/*
 * @Description: vue配置页面
 * @Version: 0.0.1
 * @Author: Chen
 * @Date: 2020-12-17 22:42:22
 * @LastEditors: Chen
 * @LastEditTime: 2021-04-16 23:55:35
 */


// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'

module.exports = {
	//基本路径
	//baseUrl: './',//vue-cli3.3以下版本使用
	publicPath: "./", //vue-cli3.3+新版本使用
	//输出文件目录
	outputDir: "dist", 
	//放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
	assetsDir: "static",
	//以多页模式构建应用程序。
	// pages: undefined,
	//是否使用包含运行时编译器的 Vue 构建版本
	// runtimeCompiler: false,
	//是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
	// parallel: require('os').cpus().length > 1,
	//生产环境是否生成 sourceMap 文件，一般情况不建议打开
	productionSourceMap: process.env.NODE_ENV === "dev",
	devServer: {
		// host: 'localhost',
		host: "localhost",
		port: 8080, // 端口号
		https: false, // https:{type:Boolean}
		open: true, //配置自动启动浏览器  http://172.11.11.22:8888/rest/XX/
		hotOnly: true, // 热更新
		// proxy: 'http://localhost:8000'   // 配置跨域处理,只有一个代理
		proxy: { //配置自动启动浏览器
			"/api": {
				target: "http://182.92.157.186:8080",
				changeOrigin: true,
				ws: false,//websocket支持
				pathRewrite: {
					'^/api': ''
				}
				// secure: false
			}
		}
	},
	configureWebpack: config => {
		if (isProduction) {
			// 代码压缩
			const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
			// gzip压缩
			const CompressionWebpackPlugin = require('compression-webpack-plugin')
			// 代码压缩 
			config.plugins.push(
				new UglifyJsPlugin(
					{
						uglifyOptions: {
							//生产环境自动删除console 
							warnings: false,
							compress: {
								// 若打包错误，则注释这行 
								drop_debugger: true,
								drop_console: true,
								pure_funcs: ['console.log']
							}
						},
						sourceMap: false,
						parallel: true
					})
			)
			// gzip压缩 
			config.plugins.push(
				new CompressionWebpackPlugin({
					filename: '[path].gz[query]',
					algorithm: 'gzip',
					test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型,
					// 只有大小大于该值的资源会被处理 10240 
					threshold: 10240,
					// 只有压缩率小于这个值的资源才会被处理 
					minRatio: 0.8,
					deleteOriginalAssets: true
					// 删除原文件 
				})
			)
			// 公共代码抽离 
			config.optimization = {
				splitChunks: {
					cacheGroups: {
						vendor: {
							chunks: 'all',
							test: /node_modules/,
							name: 'vendor',
							minChunks: 1,
							maxInitialRequests: 5,
							minSize: 0,
							priority: 100
						},
						common: {
							chunks: 'all',
							test: /[\\/]src[\\/]js[\\/]/,
							name: 'common',
							minChunks: 2,
							maxInitialRequests: 5,
							minSize: 0,
							priority: 60
						},
						styles: {
							name: 'styles',
							test: /\.(le|c)ss$/,
							chunks: 'all',
							enforce: true
						},
						runtimeChunk: {
							name: 'manifest'
						}
					}
				}
			}
		}
	}
}
