# 练习一：webpack的简单使用


## 代码使用说明

1、使用`git clone`将代码clone到你本地文件夹中,或者直接下载到你本地；此时代码是运行不了的，因为没有在本地安装依赖包；


2、确保你clone的文件中有package.json文件，然后使用`npm i`在你clone的文件夹下快速安装依赖包；

package.json文件里面记录了依赖文件包以及版本信息，以上命令行是将里面记录的依赖包全部安装；

同样，你也可以使用以下命令行，手动安装，不过我们不建议你这样做，因为会存在你安装的依赖包的版本不一致，可能会出现问题；
```
npm i webpack babel-loader babel-core babel-preset-es2015 babel-preset-react
```

3、依赖包安装完成后，在本地浏览器打开page.html文件，会弹出对话框`Hello webpack`;

---

## 本人使用webpack上手过程

1、在开始之前，我们可以对npm进行一点设置，方便我们更好的学习

* 运行`npm config set loglevel http`,可以让我们看到npm发送的每一个请求；
* 运行`npm config set progress false`,关闭安装进度条；

2、首先是运行`npm install -g webpack`全局安装webpack，在你本地新建一个文件将爱，参考官网，将例子弄到本地试试，按照官网的说明，运行`webpack`指令，然后我们打开page.html文件，F12打开控制台，存在以下报错
```
Uncaught SyntaxError: Unexpected token import
```

3、copy阮一峰的教程，把webpack.config.js改为下面这样
```
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
    ]
  }
}
```
再次运行`webpack`，发现会出现报错
```
ERROR in Entry module not found: Error: Cannot resolve module 'babel-loader' in /tmp/webpack-demo
```
提示我们需要安装依赖包babel-loader,运行`npm i babel-loader`进行安装后，再次运行`webpack`,发现还是会报错，这里就省略报错信息，按照报错信息，依次运行一下命令行，安装依赖；
```
npm i babel-core

npm i babel-preset-es2015

npm i babel-preset-react
```

3、此时已经不会报错了，但我们的页面还是什么都没有，将bar.js文件修改成一下内容：
```
export default function bar() {
  alert('Hello Webpack!')
}
```
保存后，刷新页面，依然没有反应，难道还有问题，修改文件后，需要重新运行`webpack`，此时在刷新，就会弹出`Hello webpck`的对话框了！(每次更改了文件内容后，别忘了运行`webpack`进行重新打包哦！)

就此完成了一个简单的webpack小项目；

---

## 记录我的一个坑

在使用`npm init`生成package.json文件过程中，该文件所在的文夹名不能包含大写字母，不然会出现报错；
```
name can only contain URL-friendly characters and name can no longer contain capital letters.
```

---
参考资料：
[webpack官网](https://webpack.js.org/)
<br>
[阮一峰教程](https://github.com/ruanyf/webpack-demos#demo03-babel-loader-source)
<br>
[import用法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)
<br>
[export用法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)
