/**/

function Animate () {

}


/*
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

*/

Animate.prototype.update = function () {

};

Animate.prototype.draw = function () {

};