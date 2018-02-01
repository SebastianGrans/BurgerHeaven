
var vm = new Vue({
	el: '.vue-wrapper',
	data: {
		food: food,
		lactoseFreeSrc: '/img/lactose-free.svg',
		glutenFreeSrc: '/img/gluten-free.svg'
	},
	methods: {
		order: function() {
			alert("Buy burger!");
		}
	}
});

var vm = new Vue({
	el: '.order-button-div',
	data: {
		buy: "Buy burger!",
 	},
	methods: {
		order: getOrderDetails,
	}
});