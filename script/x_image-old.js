/**/

function Image (path, pos, size, isAnimating, spriteCoords, speed) {
	this.img				= $('<img />').attr({'src': path});
	this.img				= this.img[0];
	this.size				= size;
	this.pos				= pos;
	this.bgPos				= {'left': 0, 'top': 0, 'right': this.size.height, 'bottom': this.size.height};
	this.frameCount			= 0;
	this.totalFrames		= this.size.width / this.size.height;
	this.previousFrameTime	= 0;
	this.speed				= speed;
	this.isAnimating		= isAnimating;
	this.spriteCoords		= {};
}

/// reset
/// This function resets an animation
/// This can be called from any draw function
Image.prototype.reset = function () {
	console.log('resetting');
	this.frameCount 		= 0;
	this.bgPos				= {'left': 0, 'top': 0, 'right': this.size.height , 'bottom': this.size.height};
	this.previousFrameTime	= 0;
};

/// animate
/// This function is responsible for animating. It essentially switch the image clipping at a set time interval
/// This calls itself (image) from draw()
Image.prototype.animate = function (frameTime) {

	// Set the previous frame time to the current time (frameTime) if this is the first go around
	this.previousFrameTime = (this.previousFrameTime === 0) ? frameTime : this.previousFrameTime;
	// Every 0.5 seconds, switch frames
	if ((frameTime - this.previousFrameTime) >= this.speed) {
		this.bgPos.left 	= this.size.height * this.frameCount;
		this.bgPos.top 		= 0;	// always going to be 0 unless it's a large sprite sheet
		this.bgPos.right 	= (this.size.height * this.frameCount) + this.size.height;
		this.bgPos.bottom 	= this.size.height;
		// Advance a frame
		this.frameCount = (this.frameCount === (this.totalFrames - 1)) ? 0 : this.frameCount + 1;
		// Set the new previous frame time
		this.previousFrameTime = frameTime;
	}

};

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