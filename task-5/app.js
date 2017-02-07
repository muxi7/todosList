import Vue from "vue"
import AV from "leancloud-storage"

var APP_ID = 'naiLVMvIm5tqdCuXGtBk0GDj-gzGzoHsz';
var APP_KEY = 'lpXNei5rDmfC70T68NjXgWjX';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var app=new Vue({
	el:'#app',
	data:{
		actionType:'signUp',
		formData:{
			username:'',
			password:''
		},
		newTodo:'',
		todoList:[],
		currentUser:null,
		user:''
	},
	//使用浏览器本地存储；
	// created:function(){
	// 	window.onbeforeunload=()=>{
	// 		let dataString=JSON.stringify(this.todoList);
	// 		window.localStorage.setItem('myTodos',dataString);
	// 		window.localStorage.setItem('mynewTodo',this.newTodo);
	// 	}
	// 	let oldDataString=window.localStorage.getItem('myTodos');
	// 	let newTodoData=window.localStorage.getItem('mynewTodo');
	// 	let oldData=JSON.parse(oldDataString);
	// 	this.newTodo=newTodoData || '';
	// 	this.todoList=oldData || [];
	// },

	// created:function(){
	// 	window.onbeforeunload=()=>{
	// 		let dataString=JSON.stringify(this.todoList);
	// 		var AVTodos=AV.Object.extend("AllTodos");
	// 		var avTodos=new AVTodos();
	// 		avTodos.set('content',dataString);
	// 		avTodos.save().then(function(todo){
	// 			console.log("保存成功");
	// 		},function(error){
	// 			console.log("保存失败");
	// 		});
	// 		debugger
	// 		this.currentUser=this.getCurrentUser();
	// 	}
	// },
	created:function(){
		this.currentUser=this.getCurrentUser();

		//当前处于登录状态时，this.currentUser不为null
		if(this.currentUser){
			this.user=this.currentUser.username;
		}else{
			this.user='';
		}
		this.getTodos();
	},
	methods:{
		getTodos:function(){
			if(this.currentUser){
				var query=new AV.Query('AllTodos');
				query.find().then((todos)=>{
					let avAllTodos=todos[0];
					let id=avAllTodos.id;
					this.todoList=JSON.parse(avAllTodos.attributes.content);
					this.todoList.id=id;
				},function(error){
					console.log(error);
				})
			}
		},
		updateTodos:function(){
			let dataString=JSON.stringify(this.todoList);
			let avTodos=AV.Object.createWithoutData('AllTodos',this.todoList.id);
			avTodos.set('content',dataString);
			avTodos.save().then(()=>{
				console.log("更新成功");
			},function(error){
				console.log("更新失败");
			})
		},
		saveTodos:function(){
			let dataString=JSON.stringify(this.todoList);
			var AVTodos=AV.Object.extend("AllTodos");
			var avTodos=new AVTodos();
			//新建一个ACL实例
			var acl=new AV.ACL();
			acl.setReadAccess(AV.User.current(),true);
			acl.setWriteAccess(AV.User.current(),true);

			avTodos.set('content',dataString);

			avTodos.setACL(acl); //设置访问控制

			avTodos.save().then((todo)=>{
				this.todoList.id=todo.id;
				alert("保存成功");
			},function(error){
				alert("保存失败");
			});
		},
		saveOrUpdateTodos:function(){
			if(this.todoList.id){
				this.updateTodos();
			}else{
				this.saveTodos();
			}
		},
		addTodo:function(){
			function changeTimeStyle(time){
				if(time<10){
					return '0'+time;
				}else{
					return time;
				}
			}
			let d=new Date();
			let date=d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日 '+d.getHours()+':'+changeTimeStyle(d.getMinutes())+':'+changeTimeStyle(d.getSeconds());
			this.todoList.push({title:this.newTodo,createdAt:date,done:false});
			this.newTodo='';
			this.saveOrUpdateTodos();
		},
		removeTodo:function(todo){
			let index=this.todoList.indexOf(todo);
			this.todoList.splice(index,1);
			this.saveOrUpdateTodos();
		},
		signUp: function () {
	        let user = new AV.User();
	        user.setUsername(this.formData.username);
	        user.setPassword(this.formData.password);
	        user.signUp().then((loginedUser) => {
	            this.currentUser=this.getCurrentUser();
	        },(error) => {
	        	alert("注册失败");
	        	console.log(error);
	        });
	    },
	    login:function(){
	    	AV.User.logIn(this.formData.username,  this.formData.password).then((loginedUser) => {
		    	this.currentUser=this.getCurrentUser();
		    	this.user=this.currentUser.username;
		    	this.getTodos();

		    }, function (error) {
		    	alert("登录失败");
		    	console.log(error);
		    });
	    },
	    getCurrentUser:function(){
	    	let current=AV.User.current();
	    	if(current){
	    		let {id,createdAt,attributes:{username}}=current;
	    		return {id,username,createdAt};
	    	}else{
	    		return null;
	    	}
	    },
	    logout:function(){
	    	AV.User.logOut();
	    	this.user='';
	    	this.currentUser= null;
	    	window.location.reload();
	    }
	}
})

