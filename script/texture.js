/**/


function Texture (path, pos, size) {
	this.pos	= pos;
	this.size	= size;
	this.img	= $('<img />').attr({'src': path});
	this.img	= this.img[0];
}

Texture.prototype.update = function () {

};

Texture.prototype.draw = function () {
	main.context.drawImage(this.img, this.pos.x, this.pos.y);
};