const webpack = require('webpack');
const path = require('path')


function resolve (dir) {
  return path.join(__dirname, dir)
}

const config = {
	entry: './src/index.js',
	output: {
		path: resolve('dist'),
    publicPath: '/',
    filename: 'build.js'
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
        use: [{
          loader: 'eslint-loader',
          options: {
            fix: true,//自动修复
            formatter: require('eslint-friendly-formatter')//编译后错误报告格式，可以让eslint的错误信息出现在终端上
           }
        }],
        include: [resolve('src')] //使用ESLint的文件目录
			}
		]
	}
}
module.exports = config;
