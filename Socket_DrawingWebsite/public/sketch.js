var canvas;
var canvasWidth = 600;
var canvasHeight = 600;
var socket;
var brushSize = 30;
var data = {
		x: 0,
		y: 0,
		oldX: 0,
		oldY: 0,
		color: 'blue',
		brushSize: brushSize
	} 

function setup() {
	canvas = createCanvas(canvasWidth,canvasHeight);
	//canvas.class("Sketch");
	canvas.parent('potato');
	background(51);
	socket = io.connect(window.location.hostname);
	socket.on('mouse', newDrawing);
}

function newDrawing(data){
	stroke(data.color);
	smooth(5);
	strokeWeight(data.brushSize);
	strokeCap(ROUND);
	line(data.x,data.y,data.oldX,data.oldY);
}

function mouseDragged(){
	socket.emit('mouse', data);
	return false;
}


function draw() {
	stroke(255)
	strokeCap(ROUND);
	updateMouseCoords();

	if(mouseIsPressed == true){
  line(data.x, data.y, data.oldX, data.oldY);
	}
}

function updateMouseCoords(){
	data.x = mouseX;
	data.y = mouseY;
	data.oldX = pmouseX;
	data.oldY = pmouseY;
}