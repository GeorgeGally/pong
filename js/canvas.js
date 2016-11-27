var w, width, h, height;
var canvas;
function createCanvas(canvas_name){
	canvas = document.createElement('canvas');
	var body = document.querySelector('body');
	canvas.setAttribute("id", canvas_name);
	body.appendChild(canvas);
	var ctx = canvas.getContext('2d');
	resize();
	window.addEventListener("resize", resize, false);
	return ctx;
}

function addCanvas(canvas_name, ww, hh){
	canvas = document.getElementById(canvas_name);
	var body = document.querySelector('body');
	var ctx = canvas.getContext('2d');
	if (ww != undefined && hh != undefined) {
		resize(ww, hh);
	} else {
		resize(ww, hh);
	}
		window.addEventListener("resize", resize, false);
	return ctx;
}

function createGLCanvas(canvas_name){
	canvas = document.createElement('canvas');
	var body = document.querySelector('body');
	canvas.setAttribute("id", canvas_name);
	body.appendChild(canvas);
	var gl = canvas.getContext('webgl');
	if (!gl) var gl = canvas.getContext('experimental-webgl');
	resize();
	window.addEventListener("resize", resize, false);
	return gl;
}

function resize(ww, hh){
	var c = document.getElementsByTagName('canvas');
	if (ww != undefined && ww != 0) {
		width = w = ww;
	} else {
		width = w = window.innerWidth;
	}

	if (hh != undefined) {
		height = h = hh;
	} else {
		height = h = window.innerHeight;
	}

	for(var i = 0; i < c.length; i++) {
		c[i].width = width;
		c[i].height = height;
	}
	//console.log("resize: " + w +":" + h);
	//drawCanvas();
}
