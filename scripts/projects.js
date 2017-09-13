var lastClicked = null;
var fullScreen = null;

function show(id) {
	fullScreen = true;
	document.getElementById("modal").style.display = 'block';
	var lastClicked = id;
}