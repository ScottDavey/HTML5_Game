/**/

function Sound (path, isLooping, preloaded, hasControls, vol) {
	this.vol		= vol;
	this.audEl		= $('<audio />').attr({'src': path, 'preload': preloaded, 'controls': hasControls, 'loop': isLooping});
	this.aud		= this.audEl[0];
	this.aud.volume	= this.vol;
}

Sound.prototype.play = function () {
	this.aud.play();
};

Sound.prototype.stop = function () {
	this.aud.pause();
};

Sound.prototype.changeSource = function (path) {
	var i;
	// Stop the music
	this.stop();
	// Change the source
	this.aud.src = path;
	// Play the music
	this.play();
};

Sound.prototype.setVolume = function (vol) {
	this.aud.volume = vol;
};