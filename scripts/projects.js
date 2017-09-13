var lastClicked = null;
var fullScreen = null;

document.onkeydown = function(e) {
	if (fullScreen == true) {
		if (e.keyCode == 27) hide();
	}
};

function show(id) {
	fullScreen = true;
	var boxes = document.querySelectorAll(".info");
	for (var i = 0; i < boxes.length; i++) boxes[i].style.visibility="hidden";

	document.getElementById("modal").style.display = 'block';
	document.getElementById("hideModal").style.display = 'block';
	
	lastClicked = id;
	try {
		document.getElementById("p"+id.id).style.display = 'block';
	} catch (e) {
		console.log(e);
	}
}

function hide() {
	fullScreen = false;
	var boxes = document.querySelectorAll(".info");
	for (var i = 0; i < boxes.length; i++) boxes[i].style.visibility="visible";
	document.getElementById("modal").style.display = 'none';
	document.getElementById("hideModal").style.display = 'none';
	
	try {
		document.getElementById("p"+lastClicked.id).style.display = 'none';
	} catch (e) {
		console.log(e);
	}
}
