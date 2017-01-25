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
		user:'',
	},
	created:function(){
		window.onbeforeunload=()=>{
			let dataString=JSON.stringify(this.todoList);
			window.localStorage.setItem('myTodos',dataString);
			window.localStorage.setItem('mynewTodo',this.newTodo);
		}
		let oldDataString=window.localStorage.getItem('myTodos');
		let newTodoData=window.localStorage.getItem('mynewTodo');
		let oldData=JSON.parse(oldDataString);
		this.newTodo=newTodoData || '';
		this.todoList=oldData || [];
	},
	methods:{
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
		},
		removeTodo:function(todo){
			let index=this.todoList.indexOf(todo);
			this.todoList.splice(index,1);
		},
		signUp: function () {
	        let user = new AV.User();
	        user.setUsername(this.formData.username);
	        user.setPassword(this.formData.password);
	        user.signUp().then((loginedUser) => {
	            this.currentUser=this.getCurrentUser();
	        },(error) => {
	        	alert("注册失败");
	        });
	    },
	    login:function(){
	    	AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
		    	this.currentUser=this.getCurrentUser();
		    	this.user=loginedUser._serverData.username;
		    }, function (error) {
		    	alert("登录失败");
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
	    	this.currentUser= null;
	    	window.location.reload();
	    }
	}
})

