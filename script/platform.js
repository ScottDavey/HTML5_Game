/**/

function Platform (pos) {
	this.pos			= pos;
	this.size			= {'width': 50, 'height': 50};	// Hard coding, for now
	this.type			= 'platform';
}

Platform.prototype.getPosition = function () {
	return this.pos;
};

Platform.prototype.getSize = function () {
	return this.size;
};

Platform.prototype.update = function () {
};

Platform.prototype.draw = function () {
	main.context.strokeStyle = '#05475D';
	main.context.lineWidth = 1;
	main.context.fillStyle = '#05475D';
	main.context.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
};