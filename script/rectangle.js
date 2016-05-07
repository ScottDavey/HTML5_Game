/**/

function Rectangle (pos, size) {
	this.pos	= pos;
	this.size	= size;
}


Rectangle.prototype.draw = function () {
	main.context.rect(this.pos.x, this.pos.y, this.size.width, this.size.height);
	main.context.stroke();
};