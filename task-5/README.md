# task-5运行说明

1、安装nodejs 和 npm(安装过程就不做说明，请查阅相关资料);

2、使用git clone 本地址上的demo;

3、在执行`npm i`在本地安装依赖包；

4、执行`webpack`进行打包;

5、打开page.html就可以看到效果了；

---

备注：
### bug1:当处于登录状态时，刷新页面，登录界面中的用户名会被清空；

解决思路一:当登录的时候直接`this.user=this.currentUser.username;`，同时在created中添加以下代码,当刷新页面时，`this.currentUser`会变为null,会报错，选择就解决了；(ps:方法是我乱试得，感觉还会有更简单放入思路)

```
created:function(){
		this.currentUser=this.getCurrentUser();

	//当前处于登录状态时，this.currentUser不为null
		if(this.currentUser){
			this.user=this.currentUser.username;
		}else{
			this.user='';
		}

	// this.user=this.currentUser ? this.currentUser.username : '';经过几次对比测试，发现你相比“xxx？xx:xx”这种形式if{}else{}运行速度会更快；

		this.getTodos();
	},
```
解决二：直接在page.html中直接绑定currentUser.username;（这么简单我居然才想到！！！）

### bug2:暂时不能存储用户任务的完成状态；

	暂时的解决思路是：添加存储任务的状态；




