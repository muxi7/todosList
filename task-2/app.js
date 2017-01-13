import bar from './bar';
import Vue from 'vue';


var app=new Vue({
	el:'#app',
	data:{
		message:'Hello Vue!'
	}
})
var app2=new Vue({
	el:'#app-2',
	data:{
		message:'you loaded this page on'+new Date()
	}
})
var app3=new Vue({
	el:"#app-3",
	data:{
		seen:true
	}
})
var app4=new Vue({
	el:"#app-4",
	data:{
		todos:[
			{meg:'Learn JavaScript'},
			{meg:'Learn HTML'},
			{meg:'Learn CSS'}
		]
	}
})
var app5=new Vue({
	el:"#app-5",
	data:{
		meg:"!euV olleH"
	},
	methods:{
		reverseMeg:function(){
			this.meg=this.meg.split('').reverse().join('');
		}
	}
})
var app6=new Vue({
	el:"#app-6",
	data:{
		meg:"Hello Vue!"
	}
})

