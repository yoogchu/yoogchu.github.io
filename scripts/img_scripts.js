function changeSize(newValue) {
	console.log("changeSize");
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
	console.log("Clicked image");
	if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    	return;
	}
	document.getElementById("image-fs").style.display="block";
	var clickedImage = id;
	var src = clickedImage.src;
	var newSrc = src.substring(0, src.indexOf("thumbs")) + src.substring(src.indexOf("thumbs")+7, src.indexOf("_thumb")) + src.substring(src.indexOf("_thumb")+6, src.length);
	document.getElementById("fs-image").src = newSrc;
	// document.getElementById("fs-image").style.marginLeft=((window.innerWidth-document.getElementById("fs-image").width)/2)+"px";

	document.body.style.backgroundColor="#000";
	

	clickedImage.style.visibility="hidden";
	var images = document.querySelectorAll(".container-images > img");
	for (var i = 0; i < images.length; i++) {
		images[i].style.visibility="hidden";
	}
	document.getElementsByClassName("container-images")[0].style.visibility="hidden";
	document.getElementsByClassName("header")[0].style.visibility="hidden";
	lastClickedImage = id;
}

function hideFS() {
	console.log("Hiding fullscreen image");
	lastClickedImage.style.visibility="visible";
	document.getElementById("image-fs").style.display="none";
	document.getElementsByClassName("container-images")[0].style.visibility="visible";
		var images = document.querySelectorAll(".container-images > img");
	for (var i = 0; i < images.length; i++) {
		images[i].style.visibility="visible";
	}
	document.getElementsByClassName("header")[0].style.visibility="visible";
	document.body.style.backgroundColor="#fff";
	document.getElementById("fs-image").src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
}