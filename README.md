# 前端代码规范

每个人都有自己写代码的一些习惯，例如使用tab还是space缩进、加不加分号等等，造成项目中对代码的可读性变差。以下是自己在处理代码规范的一些总结。

## editorconfig

项目中每个人都有自己偏爱的编辑器，但不同的编辑器对代码的展示会有些许的差异。例如当使用tab进行代码缩进时，一些是缩进2个空格，一些是缩进4个空格，造成代码规范的不统一。

editorconfig便能很好的解决这个问题，每个编辑器都是支持editorconfig的[插件](http://editorconfig.org/)，安装成功后编辑器便会去读去跟目录下的.editorconfig文件的代码规范，覆盖编辑器自带的代码规范，从而达到统一的效果。

以下是我的一些配置信息，详细配置信息请戳[这里](http://editorconfig.org/)

```Git
# http://editorconfig.org

# 表明是最顶层的配置文件
root = true
# 正则*匹配所有文件
[*]
# 编码格式
charset = utf-8
# 定义换行符
end_of_line = lf
# 缩进空格数
indent_size = 2
# 缩进方式
indent_style = space
# 文件是否以空白行结尾
insert_final_newline = true
# 是否去处行首行尾的空白字符
trim_trailing_whitespace = true

# 正则匹配以.md结尾的文件
[*.md]

# 保存文件时是否在结尾添加一个新行
insert_final_newline = false
# 在新行之前是否移除所有的空格字符
trim_trailing_whitespace = false
```

## ESLint

[ESLint](http://eslint.cn/)是一个javascript代码的检测工具，以下以一个webpack的例子讲解如何使用ESLint。

### .eslintrc.js与.eslintignore文件的配置

.eslintrc.js是配置ESlint的基本配置文件，以后是我的配置及一些总结。

```
module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: "standard",
  plugins: [
    'html'
  ],
  rules: {
    indent: ["error", 2],
  }
}
```

- `env`指定你想启用的环境

- `extends`表示继承该插件中的规则。

  > "extends": "eslint:all"表示使用eslint中所有的[规则](http://eslint.cn/docs/rules/)

  > extends: "eslint:recommended"表示使用eslint中打勾的[规则](http://eslint.cn/docs/rules/)

  > extends: "standard" 表示使用[standard规则](https://standardjs.com/rules-zhcn.html#javascript-standard-style)，使用时需要安装依赖
  >
  > ```
  > npm install standard --save-dev
  > ```

- `plugins`表示使用而外的插件，主要有eslint-plugin-html跟eslint-plugin-react

  > eslint-plugin-html用于html代码中的js代码的验证，多用于VUE

  > eslint-plugin-react用于react代码的验证

- `rules`表示一些而外的配置信息，例如不想使用一些规则里的东西

  > 0 = off（关闭），1 = warn（警告）， 2 = error（错误）

  > 有参数的配置：indent: ["error", 2]

  > 无参数的配置："no-console": 0

- eslint主张不在JS结尾使用分号，关于使不使用分号可读戳[这里](https://www.zhihu.com/question/20298345)，但由于也可根据个人习惯在JS代码结尾都加上分号，只需在rules中添加

  ```
  semi: ["error", "always"],// 自动补齐分号
  ```

.eslintignore 文件告诉 ESLint 去忽略特定的文件和目录，默认会忽略/node_modules/* 和 /bower_components/* 

## package.json中的eslintConfig与eslintIgnore

ESLint可以通过.eslintrc.js与.eslintignore也可以在package.json中通过eslintConfig与eslintIgnore配置，简单示例：

```
"eslintConfig": {
  "env": {
    "node": true
  }
},
"eslintIgnore": ["hello.js", "world.js"]
```

## 命令行的配置

```
"lint": "eslint --ext \".js\" src --fix"
```

- `--ext`ESLint 在指定的目录下查找 JavaScript 文件时要使用的文件扩展名
- `--fix`选项用来自动修复规则所报告的问题。当使用extends: "standard"时会去除所有JS结尾的分号，当rules中添加  semi: ["error", "always"]时则会补全所有JS结尾的分号。

### webpack中的配置

以下是我个人的一些配置信息，基本的webpack功能不做详解，ESLint的配置均作了注释。

```
const webpack = require('webpack');
const path = require('path')


function resolve (dir) {
  return path.join(__dirname, '..', dir)
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

```

代码已上传github，可点击[下载](https://github.com/PLDaily/ESLint-webapck)调试。