/**/

function PlatformTool (pos) {
	this.tool			= new Texture('images/platformTool_blue.png', this.pos);
	this.pos			= {'x': main.CANVAS_WIDTH - 70, 'y': 20};
	this.size			= {'width': 50, 'height': 50};
}

PlatformTool.prototype.GetPosition = function () {
	return this.pos;
};

PlatformTool.prototype.update = function (pos) {
	var newX, newY;
	// Round to the nearest 50 for x and y so we can snap it to a grid
	newX = Math.floor(pos.x / this.size.width) * this.size.width;
	newY = Math.floor(pos.y / this.size.height) * this.size.height;
	this.pos.x = newX;
	this.pos.y = newY;
	this.tool.update(this.pos);
};

PlatformTool.prototype.draw = function () {
	this.tool.draw();
};