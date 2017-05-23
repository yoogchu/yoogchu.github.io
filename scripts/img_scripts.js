function changeSize(newValue) {
	document.getElementById("image-size").innerHTML = newValue;

	var images = document.querySelectorAll(".container-images > img");
	console.log(images);
	newValue = newValue+"px";

	for( var i = 0; i < images.length; i++) {
		console.log("changing " + images[i] + "to " + newValue);
	    images[i].style.width=newValue;
	}
}

var lastClickedImage = null;
function clickImage(id) {
	if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    	return;
	}
	var clickedImage = id;
	lastClickedImage = id;
	clickedImage.style.visibility="hidden";
	var images = document.querySelectorAll(".container-images > img");
	for (var i = 0; i < images.length; i++) {
		images[i].style.visibility="hidden";
	}
	// document.getElementsByClassName("container-images")[0].style.backgroundColor="#000";
	document.body.style.backgroundColor="#000";

	document.getElementById("image-fs").style.display="block";
	document.getElementById("fs-image").src = clickedImage.src;
	document.getElementById("fs-image").style.marginLeft=((window.innerWidth-document.getElementById("fs-image").width)/2)+"px";
	document.getElementsByClassName("container-images")[0].style.visibility="hidden";
	document.getElementsByClassName("header")[0].style.visibility="hidden";
}

function hideFS() {
	console.log("Hiding fullscreen image");
	lastClickedImage.style.visibility="visible";
	document.getElementById("image-fs").style.display="none";
	// document.getElementsByClassName("container-images")[0].style.backgroundColor="#f0f0f0";
	document.getElementsByClassName("container-images")[0].style.visibility="visible";
		var images = document.querySelectorAll(".container-images > img");
	for (var i = 0; i < images.length; i++) {
		images[i].style.visibility="visible";
	}
	document.getElementsByClassName("header")[0].style.visibility="visible";
	document.body.style.backgroundColor="#fff";
}