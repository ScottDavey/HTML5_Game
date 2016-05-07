/* JAVASCRIPT (jQuery) Document - LEVEL */

// CONSTRUCTOR
function Level () {
	this.backgrounds			= ['images/levels/1.jpg', 'images/levels/2.jpg', 'images/levels/3.jpg'];
	this.levelBG				= new Texture(this.backgrounds[2], {'x': 0, 'y': 0});
	this.player1				= new Player(1);
	// Audio
	this.music					= new Sound('sounds/MUSIC_SearchTheWorld.mp3', true, 'auto', 'none', 0.4);	//path, isLooping, preloaded, hasControls, vol
	this.ambience				= new Sound('sounds/SFX_Ambience_Forest.mp3', true, 'auto', 'none', 0.4);	//path, isLooping, preloaded, hasControls, vol

	// Input details
	this.leftMouseLock			= {'isLocked': false, 'lockStartTime': 0, 'secondsUntilUnlock': 1};

	// Play music
	this.music.play();
	this.ambience.play();

	
	// Platforms and Regions
	this.platformArr			= [];	
	/*this.regionsMap				= [[0,0],[300,0],[600,0],[0,227.5],[300,227.5],[600,227.5]];
	this.regions				= [];

	for (var i = 0; i < this.regionsMap.length; i++) {
		this.regions.push(new Rectangle({'x': this.regionsMap[i][0], 'y': this.regionsMap[i][1]}, {'width': 300, 'height': 227.5}));
	}*/
}

// drawText
// Draws a string to the canvas
// Called from itself (Level)
Level.prototype.drawText = function (string, x, y, font, color) {
	main.context.save();
	main.context.font = font;
	main.context.fillStyle = color;
	main.context.fillText(string, x, y);
	main.context.restore();
};

// Update
// Updates member of the Level 'class' each frame
// Called by main.update
Level.prototype.update = function () {
	var d, gameTime;
	d = new Date();
	gameTime = d.getTime() / 1000;

	///////////////////
	// HANDLE INPUTS //
	///////////////////

	// Remove any locks
	if ((gameTime - this.leftMouseLock.lockStartTime) >= this.leftMouseLock.secondsUntilUnlock) {
		this.leftMouseLock.isLocked = false;
	}

	// Keyboard: Change the music
	if (Input.Key.GetKey(Input.Key.ONE)) {
		this.music.changeSource('sounds/MUSIC_SearchTheWorld.mp3');
		this.music.setVolume(0.3);
		// Start ambient sounds if they're paused
		if (this.ambience.paused) { this.ambience.play(); }
	} else if (Input.Key.GetKey(Input.Key.TWO)) {
		this.music.changeSource('sounds/MUSIC_Town_Main.wav');
		this.music.setVolume(1);
		// Start ambient sounds if they're paused
		if (this.ambience.paused) { this.ambience.play(); }
	} else if (Input.Key.GetKey(Input.Key.THREE)) {
		this.music.changeSource('sounds/MUSIC_Megaman2_DrWily.wav');
		this.music.setVolume(0.1);
	} else if (Input.Key.GetKey(Input.Key.ZERO)) {
		this.music.stop();
		this.ambience.stop();
	}

	// Mouse: Add platforms
	if (Input.Mouse.GetButton(Input.Mouse.LEFT) && !this.leftMouseLock.isLocked) {
		this.platformArr.push(new Platform(Input.Mouse.GetPosition().x, Input.Mouse.GetPosition().y));
		this.leftMouseLock.isLocked = true;
		this.leftMouseLock.lockStartTime = gameTime;
	}

	///////////////////
	// UPDATE PLAYER //
	///////////////////
	this.player1.update(this.platformArr);
};

// Draw
// Draws member of the Level 'class' each frame
// Called by main.draw
Level.prototype.draw = function () {
	// Draw the Level background
	this.levelBG.draw({'x': 0, 'y': 0});

	// Draw Platforms
	$.each(this.platformArr, function (i, e) {
		e.draw();
	});

	// Regions
	/*for (var i = 0; i < this.regions.length; i++) {
		this.regions[i].draw(); 
	}*/

	// Draw the player
	this.player1.draw();

	// Draw Text
	this.drawText('Change Music (1 - 3, 0 to stop)', 20, 30, 'lighter 9pt Century Gothic', '#FFFFFF');
	this.drawText('Click anywhere to add a platform', 780, 30, 'lighter 9pt Century Gothic', '#FFFFFF');
};