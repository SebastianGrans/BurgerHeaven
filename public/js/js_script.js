
function getOrderDetails() {

	// if(vm.getNOfBurgers() == 0) {
	// 	document.getElementById("orderConfirm").innerHTML = "No burger selected.";
	// 	document.getElementById("orderConfirm").style.color = "red";
	// 	document.getElementById("orderConfirm").style.display = "block";
	// }

	// var burgers = document.querySelectorAll('input[name="selected-burger"]:checked');
	// console.log(burgers.length);
	// if(burgers.length == 0) {
	// 	document.getElementById("details").innerHTML = "No burger selected.";
	// 	document.getElementById("details").style.color="red";
	// 	document.getElementById("orderConfirm").style.display = "block";
	// 	return -1;
	// }

	// var burgersHTML = "Ordered burger";
	// if(burgers.length > 2) {
	// 	burgersHTML += "s: ";
	// } else {
	// 	burgersHTML += ": ";
	// }
	// // console.log(burgers[0]);
	// var i;
	// for(i = 0; i < burgers.length; i++) {
	// 	// console.log(burgers[0].value);
	// 	burgersHTML += burgers[i].value
	// 	if(i < burgers.length-1 && burgers.length > 1) {
	// 		burgersHTML +=  ", ";
	// 	}
	// }

	// var orderDetails = {
	// 	name: "Name: " + document.getElementById("name").value, 
	// 	email: "Email: " + document.getElementById("email").value,
	// 	// street: "Street: " + document.getElementById("street").value,
	// 	// hnr: "House nummer: " + document.getElementById("hnr").value,
	// 	payment: "Payment method: " + document.getElementById("payment").value,
	// 	gender: "Gender: " + document.querySelector('input[name="gender"]:checked').value,
	// 	burger: burgersHTML
	// };


	// console.log(orderDetails);
	// document.getElementById("details").innerHTML = orderDetails.name + "<br>" + 
	//  												orderDetails.email + "<br>" + 
	//  												orderDetails.street + " " + orderDetails.hnr + "<br>" + 
	//  												orderDetails.payment + "<br>" + 
	//  												orderDetails.gender + "<br>" + 
	//  												orderDetails.burger;

	document.getElementById("orderConfirm").style.display = "block";
}

