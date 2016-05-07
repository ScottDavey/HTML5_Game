/**/

function Image (path, pos, size, isAnimating, spriteCoords, speed) {
	
}

/// update
/// This function is responsible for changing information about how an image is being used
/// Can be called from any update function
Image.prototype.update = function (pos, dir, action) {
	this.pos	= pos;
};

/// draw
/// Draw the image to the screen. If it's an animated image, call animate() first
/// This is called any time another class want to draw an image (ex: from level or player). It will always be called from another classes draw function
Image.prototype.draw = function (pos) {
	var d, frameTime;

	// Set default values if arguments aren't passed in
	dir = (typeof dir === 'undefined') ? 'RIGHT' : 'LEFT';	// If dir isn't passed in, assume it's right (which will be considered the 'correct' orientation for an image)
	isJumping = (typeof isJumping === 'undefined') ? false : isJumping;

	// If this image should be animated, animate it.
	if (this.isAnimating) {
		d = new Date();
		frameTime = d.getTime() / 1000;
		this.animate(frameTime);
	}
	// Image, BG Start X, BG Start Y, BG End X, BG End Y, Pos X, Pos Y, Stretch X, Stretch Y
	main.context.drawImage(this.img, this.bgPos.left, this.bgPos.top, this.size.height, this.bgPos.bottom, pos.x, pos.y, this.size.height, this.size.height);
};