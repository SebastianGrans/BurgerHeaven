
function orderValidation(order) {

	for(var prop in order) {
		if(order[prop] == null || order[prop] == '') {
			return false; // The user had missed a field. 
		}
	}
	// loc.x and loc.y was not included above. 
	if(order.loc.x == null || order.loc.y == null) {
		return false;
	}
	return true; // All field where okey. 
};

function disableInputs() {
	var inputs = document.getElementsByTagName("input");
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].disabled = true;
	}
	var opts = document.getElementsByTagName("option");
	for (var i = 0; i < opts.length; i++) {
		opts[i].disabled = true;
	}
	// document.getElementByID("order-button").disabled = true;
}