function attach(element,listener,ev,tf){

if(element.attachEvent) {

    element.attachEvent("on"+listener,ev);

}else{

    element.addEventListener(listener,ev,tf);

}

}

function fadeOut(element,startLevel,endLevel,duration,callback){

var fOInt;

    op = startLevel;

fOInt = setInterval(function() {

    if(op<=endLevel){

    element.style.opacity = endLevel;
    element.style.filter = "alpha(opacity = " + endLevel + ")";

    clearInterval(fOInt);

        if(typeof callback == 'function') callback(true);

    }else{

    op -= 0.1;

    element.style.opacity = op;
    element.style.filter = "alpha(opacity = " + op*100 + ")";

    }

    },duration);

}

attach(window,'load',function(){

    fadeOut(document.getElementById('loader'),1,0,50,function(cb){
    	document.getElementById('loader').style.display="none";
    });
    

},false);