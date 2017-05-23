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

var windowLocation = null;
var lastClickedImage = null;
function clickImage(id) {
	var clickedImage = id;
	lastClickedImage = id;
	clickedImage.style.visibility="hidden";
	var images = document.querySelectorAll(".container-images > img");
	for (var i = 0; i < images.length; i++) {
		images[i].style.opacity="0";
	}
	document.getElementsByClassName("container-images")[0].style.backgroundColor="#000";
	document.body.style.backgroundColor="#000";

	document.getElementById("image-fs").style.display="block";
	document.getElementById("fs-image").src = clickedImage.src;
	document.getElementById("fs-image").style.marginLeft=((window.innerWidth-document.getElementById("fs-image").width)/2)+"px";
	document.getElementsByClassName("container-images")[0].style.display="hidden";
	

	document.getElementsByClassName("header")[0].style.display="hidden";
	windowLocation = window.screenTop;
	console.log(windowLocation);

}

function hideFS() {
	console.log("Hiding fullscreen image");
	lastClickedImage.style.visibility="visible";
	document.getElementById("image-fs").style.display="none";
	document.getElementsByClassName("container-images")[0].style.backgroundColor="#f0f0f0";
	document.getElementsByClassName("container-images")[0].style.display="block";
		var images = document.querySelectorAll(".container-images > img");
	for (var i = 0; i < images.length; i++) {
		images[i].style.opacity=".8";
	}
	document.getElementsByClassName("header")[0].style.display="block";
	document.body.style.backgroundColor="#fff";
}