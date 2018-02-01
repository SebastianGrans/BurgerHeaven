
function getOrderDetails() {
	console.log("asdf");
	var orderDetails = [];
	orderDetails.push(document.getElementById("name").value);
	orderDetails.push(document.getElementById("email").value);
	orderDetails.push(document.getElementById("street").value);
	orderDetails.push(document.getElementById("hnr").value);
	orderDetails.push(document.getElementById("payment").value);
	orderDetails.push(document.querySelector('input[name="gender"]:checked').value);
	orderDetails.push(document.querySelector('input[name="selected-burger"]:checked').value);
	console.log(orderDetails);
}

