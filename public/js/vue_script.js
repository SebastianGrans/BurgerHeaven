
'use strict';
var socket = io();

var vm = new Vue({
	el: '#vue-div',
	data: {
		food: food,
		burgername: [],
		lactoseFreeSrc: '/img/lactose-free.svg',
		glutenFreeSrc: '/img/gluten-free.svg',
		orderId: null,
		order_struct: {
			name: null,
			email: null,
			loc: {x: null, y: null},
			payment: '',
			gender: null,
			burgers: [] 
		},
		preparing: false,
		sent: false,
		resolved: false,
		error: false,
	},
	created: function () {
	    socket.on('order_recieved', function (orderId) {
	      console.log("Order was recieved and got id: " + orderId);
	      this.orderId = orderId;
	    }.bind(this));

	    socket.on('order_preparing', function (orderId) {
	      console.log("An order with id " + orderId + " is being prepared. ");
	      if(this.orderId == orderId) {
	      	this.preparing = true;	
	      	console.log("Our order " + orderId + " is being prepared.")
	    }

	      document.getElementById("order-status").innerHTML = "<br>Order has been recieved by the kitchen and is being prepared!";
	      document.getElementById("order-status").style.display = "block";
	    }.bind(this));

	    socket.on('order_dispatched', function (orderId) {
	      console.log("An order with id " + orderId + " has been dispatched. ");
	      if(this.orderId == orderId) {
	      	this.sent = true;
	      	console.log("Our order " + orderId + " has been dispatched.")
	      }
	      document.getElementById("order-status").innerHTML += "<br>Order has now been dispatched and is on its way to you!";
	      document.getElementById("order-status").style.display = "block";
	    }.bind(this));

	    socket.on('order_resolved', function (orderId) {
	      console.log("An order with id " + orderId + " has been dispatched. ");
	      if(this.orderId == orderId) {
	      	this.resolved = true;
	      	console.log("Our order " + orderId + " has been resolved")
	      }
	      document.getElementById("order-confirmation").style.display = "none";
	    }.bind(this));
  	},
	methods: {
		displayOrder: function(event) {
			var offset = {x: event.currentTarget.getBoundingClientRect().left,
		                    y: event.currentTarget.getBoundingClientRect().top};
		   	var x = event.clientX - 10 - offset.x;
		 	var y = event.clientY - 10 - offset.y;
		 	// console.log("x: " + x + " y: " + y);
		 	this.order_struct.loc.x = x;
		 	this.order_struct.loc.y = y;
		},
		addOrder: function(event) {
			if(!orderValidation(this.order_struct)) {
				// At least one value was not entered. 
				document.getElementById("order-error").style.display = "block";
				this.error = true
			} else {
				this.error = false
				document.getElementById("order-error").style.display = "none";
				document.getElementById("order-success").style.display = "block";
			}

			document.getElementById('cust-info').scrollIntoView({ 
  	 			behavior: 'smooth' 
			});

			if(this.error){
				return;
			}

			disableInputs(); 
		 
	      	socket.emit("addOrder", this.order_struct);
	    },
	}
});

