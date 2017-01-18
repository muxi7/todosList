import Vue from "vue"

var app=new Vue({
	el:'#app',
	data:{
		newTodo:'',
		todoList:[]
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
			let d=new Date();
			let date=d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日 '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
			this.todoList.push({title:this.newTodo,createdAt:date,done:false});
			this.newTodo='';
		},
		removeTodo:function(todo){
			let index=this.todoList.indexOf(todo);
			this.todoList.splice(index,1);
		}
	}
})

