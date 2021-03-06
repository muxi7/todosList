# 练习二：hello vue!

## 使用说明

1、使用`git clone ...`将项目clone到本地的文件夹中，

2、在当前文件夹中执行`npm i`命令行在本地安装依赖包；

3、执行`webpack`,然后打开page.html，你就可以看到Hello Vue ! (以及[vue.js广官方文档](https://cn.vuejs.org/v2/guide/index.html)上的几个例子)

---

## 上手过程

1、首先在任务一的基础上，执行`npm install vue`安装vue依赖包，此时会出现很多警告，这个先不管，直接更改webpack.config.js文件
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
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  }
}
```

2、现在我们开始处理警告，其实它只是提醒我们需要有一个README.md文件，`touch README.md` 并写入我们项目的一些说明，如果文件夹中没有package.json也会提出警告，这里你要知道，这里由于借鉴了任务一的代码，所以这里我们需要对package.json进行一些修改，需要在依赖里加入vue的一些信息，不过我们不建议这样去做，我们不妨直接删掉package.json文件，运行`npm init`,然后根据提示填写信息（不知道的可以一路回车），此时会根据你当前的文件夹生成一个带有vue信息的新的package.json文件，不行你可以打开看看这个文件；

此时你再次`npm install vue`,你会发现警告已经消除，

3、接下来我们，可以抄写一下Vue.js中文文档上的一些例子，运行的试一下，在page.html中添加html代码，在app.js中添加vue实例的js代码，就像下面这样：
```
<html>
  <head>
  </head>
  <body>
    <div id="app">
      {{ message }}
    </div>

    <script src="bundle.js"></script>
  </body>
</html>

```
```
import bar from './bar';

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

4、运行`webpack`后，我们并没有得到官方文档的结果，怎么回事呢？我们在app.js中添加`import Vue form 'vue'`,然后在执行`webpack`后，此时刷新页面就得到了我们想要的结果了；

---

自此我们成功的运行了一个Vue的小程序，另外，大家也可以试一试官方文档的其他例子；

---
遇到的问题：vue有两种构建方式，我们这里用到的是[独立构建],我在这种构建下尝试其他示例的时候，发现在控制台无法直接获取vue实例对象,，这是怎么回事？我尝试通过`<script src="vue.js"></script`直接引入vue.js时，演示例子，在控制台是可以获取vue实例对象的。



---

参考资料：
[vue.js官方文档](https://cn.vuejs.org/);