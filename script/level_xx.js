/* JAVASCRIPT (jQuery) Document - LEVEL */

// CONSTRUCTOR
function Level () {
	this.backgrounds			= ['images/levels/1.jpg', 'images/levels/2.jpg', 'images/levels/5.png'];
	this.levelBG				= new Texture(this.backgrounds[2], {'x': 0, 'y': 0});
	this.player1				= new Player(1);
	// Audio
	this.music					= new Sound('sounds/MUSIC_SearchTheWorld.mp3', true, 'auto', 'none', 0.4);	//path, isLooping, preloaded, hasControls, vol
	this.ambience				= new Sound('sounds/SFX_Ambience_Forest.mp3', true, 'auto', 'none', 0.4);	//path, isLooping, preloaded, hasControls, vol

	// Input details
	this.leftMouseLock			= {'isLocked': false, 'lockStartTime': 0, 'secondsUntilUnlock': 0.2};

	// Play music
	//this.music.play();
	//this.ambience.play();


	// Platforms and Regions
	this.platformToolSelector	= {'x': 930, 'y': 20, 'width': 50, 'height': 50, 'isSelected': false};
	this.platformTool			= new PlatformTool(Input.Mouse.GetPosition());
	this.platformArr			= [];
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
	var d, gameTime, mousePosition;
	d = new Date();
	gameTime = d.getTime() / 1000;
	mousePosition = Input.Mouse.GetPosition();

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

	// Show Platform Cursor
	this.platformTool.update(Input.Mouse.OnMouseMove.GetPosition());

	// Mouse: Add platforms
	if (Input.Mouse.GetButton(Input.Mouse.LEFT) && !this.leftMouseLock.isLocked) {
		if (mousePosition.x > 930 && mousePosition.x < 980 && mousePosition.y > 20 && mousePosition.y < 70) {
			this.platformToolSelector.isSelected = (this.platformToolSelector.isSelected) ? false : true;
		} else if (this.platformToolSelector.isSelected) {
			this.platformArr.push(new Platform({'x': Math.floor(mousePosition.x / 50.0) * 50.0, 'y': Math.floor(mousePosition.y / 50.0) * 50.0}));
		}

		console.log(this.platformTool.GetPosition());

		this.leftMouseLock.isLocked = true;
		this.leftMouseLock.lockStartTime = gameTime;
	}

	///////////////////
	// UPDATE PLAYER //
	///////////////////
	this.player1.update(this.platformArr);

	mousePosition = 0;
};

// Draw
// Draws member of the Level 'class' each frame
// Called by main.draw
Level.prototype.draw = function () {
	var platformTool_Stroke;
	// Draw the Level background
	this.levelBG.draw({'x': 0, 'y': 0});

	// Draw Platforms
	$.each(this.platformArr, function (i, e) {
		e.draw();
	});

	// Draw Text
	this.drawText('Change Music (1 - 3, 0 to stop)', 20, 30, 'lighter 9pt Century Gothic', '#FFFFFF');

	// Platform Tool Selector
	platformTool_Stroke = (this.platformToolSelector.isSelected) ? {'style': '#27697F', 'lineWidth': 2} : {'style': '#05475D', 'lineWidth': 2};
	main.context.rect(this.platformToolSelector.x, this.platformToolSelector.y, this.platformToolSelector.width, this.platformToolSelector.height);
	main.context.fillStyle = '#05475D';
	main.context.fill();
	main.context.strokeStyle = platformTool_Stroke.style;
	main.context.lineWidth = platformTool_Stroke.lineWidth;
	main.context.stroke();

	// Platform Cursor
	if (this.platformToolSelector.isSelected) {
		this.platformTool.draw();
	}

	// Draw the player
	this.player1.draw();
};