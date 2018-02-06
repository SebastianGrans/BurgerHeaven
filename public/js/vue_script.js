
'use strict';
var socket = io();

var vm = new Vue({
	el: '#vue-div',
	data: {
		food: food,
		burgername: [],
		lactoseFreeSrc: '/img/lactose-free.svg',
		glutenFreeSrc: '/img/gluten-free.svg',
		order_struct: {
			name: '',
			email: '',
			loc: {x: null, y: null},
			payment: 'cash',
			gender: 'Birdperson',
			burgers: [] 
		},
		order_sent: false	
	},
	methods: {
		getNOfBurgers: function() {
			return this.order_struct.burgers.length;
		},
		displayOrder: function(event) {
			var offset = {x: event.currentTarget.getBoundingClientRect().left,
		                    y: event.currentTarget.getBoundingClientRect().top};
		   	var x = event.clientX - 10 - offset.x;
		 	var y = event.clientY - 10 - offset.y;
		 	console.log("x: " + x + " y: " + y);
		 	this.order_struct.loc.x = x;
		 	this.order_struct.loc.y = y;
		},
		addOrder: function (event) {
			if(this.order_sent || this.order_struct.burgers.length < 1) {
				return;
			}
			document.getElementById('cust-info').scrollIntoView({ 
  	 			behavior: 'smooth' 
			});
			this.order_sent = true;
		  	var inputs = document.getElementsByTagName("input");
			for (var i = 0; i < inputs.length; i++) {
				inputs[i].disabled = true;
			}
			var opts = document.getElementsByTagName("option");
			for (var i = 0; i < opts.length; i++) {
				opts[i].disabled = true;
  			}
  			var date = new Date();
	      	socket.emit("addOrder", this.order_struct);
	       // socket.emit("helloworld", "hello there...");
	    }
	}
});

// var vm = new Vue({
// 	el: '.order-button-div',
// 	data: {
// 		buy: "Buy burger!",
//  	},
// 	methods: {
// 		order: getOrderDetails,
// 	}
// });