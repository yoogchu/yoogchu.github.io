//Some functions for manipulating photography page

var lastClickedImage = null;
var fullScreen = false;

document.onkeydown = function(e) {
	if (fullScreen == false) {
		return;
	} else {
		changeImage(e);
	}
};

function changeImage(e) {
	try {
		code = e.keyCode;
	} catch (err) {}

	if (code === undefined) {
		code = e;
	}
	console.log(code);

	var fs_source = document.getElementById("fs-image").src;
	var img = {
			path:fs_source.substring(0, fs_source.lastIndexOf("/")+1),
			num:fs_source.substring(fs_source.lastIndexOf("/")+1, fs_source.lastIndexOf(".")),
			ext: fs_source.substring(fs_source.lastIndexOf(".")+1)
		}

	var images = document.querySelectorAll(".image");
	first_img_str = images[0].style.backgroundImage.split('(')[1].split(')')[0];
	console.log(first_img_str);
	first_img = first_img_str.substring(first_img_str.lastIndexOf("/")+1, first_img_str.lastIndexOf("_"));
	switch (code) {
		case 27: //esc
			hideFS()
		case 37:	//left
		case 0: 
			if (img.num == first_img) {
				img.num = 1
			} else {
				img.num++;
			}
			break;
		case 39:	//right
		case 1:
			if (img.num == 1) { 
				img.num = first_img
			} else {
				img.num--;
			}
			break;
	}
	
	document.getElementById("fs-image").src = img.path + img.num + "." + img.ext;
}


function changeSize(newValue) {
	document.getElementById("image-size").innerHTML = newValue;
	var images = document.querySelectorAll(".container-images > img");
	newValue = newValue+"px";
	for(var i = 0; i < images.length; i++) images[i].style.width=newValue;
}

function clickImage(id) {
	fullScreen = true;
	document.getElementById("image-fs").style.display="block";
	// document.getElementById("image-fs").style.visibility='visible';

	var clickedImage = id;
	// var src = clickedImage.src;
	console.log(clickedImage);

	var src = clickedImage.style.backgroundImage.split('(')[1].split(')')[0];
	console.log(src);

	var newSrc = src.substring(0, src.indexOf("thumbs")) + 'photos/' + src.substring(src.indexOf("thumbs")+7,
		src.indexOf("_thumb")) + src.substring(src.indexOf("_thumb")+6, src.length);
	console.log(newSrc);
	if (newSrc.indexOf('"') != -1) {
		newSrc = newSrc.substring(1,newSrc.length-1);
	}
	console.log(newSrc);
	document.getElementById("fs-image").src = newSrc;

	if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
		document.getElementById('exitFS').style.display="none";
		document.getElementById('arrow_left').style.display="none";
		document.getElementById('arrow_right').style.display="none";

		if (window.innerHeight > window.innerWidth) document.getElementById('fs-image').style.marginTop="50%";	
	}
	lastClickedImage = id;
}

function hideFS() {
	fullScreen = false;
	document.getElementById("image-fs").style.display="none";
	document.getElementById("fs-image").src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
}

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
	var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
	return { width: srcWidth*ratio, height: srcHeight*ratio };
 }
