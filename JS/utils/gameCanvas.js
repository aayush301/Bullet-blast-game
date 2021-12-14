function GameCanvas()
{
	const canvas = document.querySelector("canvas");
	const pen = canvas.getContext("2d");
	
	this.getWidth = function() {
		return canvas.width;
	}
	
	this.getHeight = function() {
		return canvas.height;
	}
	
	this.setWidth = function(w) {
		canvas.width = w;
	}
	
	this.setHeight = function(h) {
		canvas.height = h;
	}
	
	this.getCanvas = function() {
		return canvas;
	}
	
	this.clearCanvas = function() {
		pen.clearRect(0,0, canvas.width, canvas.height)
	}
	
	this.drawFillRect = function(x1,y1,x2,y2,color) {
		const width = x2-x1;
		const height = y2-y1;
		pen.beginPath();
		pen.fillStyle = color;
		pen.fillRect(x1,y1,width,height);
	}
	
	this.writeText = function(text, x, y) {
		pen.beginPath();
		pen.font = "25px Fresca";
		pen.fillStyle = "white";
		pen.textAlign = "left"
		pen.fillText(text,x,y);
	}
}