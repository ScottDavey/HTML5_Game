/**/

/// SIZE:
///		* this.size.width 	= sheet width
///		* this.size.height 	= frame height
/// We don't care how tall the sheet is because we're also passing the clipStartY (starting Y coordinate for clip position)

function Animation (path, pos, frameSize, sheetWidth, animationSeq, speed, dir) {
	this.img				= $('<img />').attr({'src': path});
	this.img				= this.img[0];
	this.frameSize			= frameSize;
	this.sheetWidth			= sheetWidth;
	this.pos				= pos;
	this.dir				= dir;
	this.clip				= {'left': 0, 'top': (animationSeq * this.frameSize), 'right': this.frameSize, 'bottom': this.frameSize};
	this.frameCount			= 0;
	this.totalFrames		= this.sheetWidth / this.frameSize;
	this.previousFrameTime	= 0;
	this.speed				= speed;
}

/// update
/// This function is responsible for changing information about how an image is being used
/// Can be called from any update function
Animation.prototype.update = function (pos, animationSeq) {
	this.pos 			= pos;
	this.clip.top		= animationSeq * this.frameSize;
};

/// animate
/// This function is responsible for animating. It essentially switches the image clipping at a set time interval
/// This calls itself (Animation) from draw()
Animation.prototype.animate = function (frameTime) {

	// Set the previous frame time to the current time (frameTime) if this is the first go around
	this.previousFrameTime = (this.previousFrameTime === 0) ? frameTime : this.previousFrameTime;
	// Every 0.5 seconds, switch frames
	if ((frameTime - this.previousFrameTime) >= this.speed) {
		
		this.clip.left 	= this.frameSize * this.frameCount;
		this.clip.right	= (this.frameSize * this.frameCount) + this.frameSize;
		// Advance a frame
		this.frameCount = (this.frameCount === (this.totalFrames - 1)) ? 0 : this.frameCount + 1;
		// Set the new previous frame time
		this.previousFrameTime = frameTime;
	}

};


Animation.prototype.draw = function () {
	var d, frameTime;
	// Get a snap shot of the time in seconds
	d = new Date();
	frameTime = d.getTime() / 1000;
	this.animate(frameTime);

	// Image, BG Start X, BG Start Y, BG End X, BG End Y, Pos X, Pos Y, Stretch X, Stretch Y
	main.context.drawImage(this.img, this.clip.left, this.clip.top, this.frameSize, this.clip.bottom, this.pos.x, this.pos.y, this.frameSize, this.frameSize);

};