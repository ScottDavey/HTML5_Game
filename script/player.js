/* JAVASCRIPT DOCUMENT (jQuery) - PLAYER */

function Player (num) {
	this.pos					= {'x': 100, 'y': -200};	// Fall in from the sky
	this.previousPos			= {};
	this.size					= {'width': 50, 'height': 50};
	this.walkSpeed				= 100;
	this.runSpeed				= 100;
	this.dir					= 'RIGHT';
	this.animationSeq 			= 0;
	this.jumpSpeed				= 40;
	this.jumpLock				= false;
	this.velocity				= {'x': 0, 'y': 0};
	this.isJumping				= false;
	this.isOnGround				= false;
	this.friction				= 0.8;
	this.gravity				= 2.5;

	// Player Textures
	this.playerSprite			= new Animation('images/entities/Player2_SpriteSheet_MASTER.png', this.pos, 50, 450, this.animationSeq, 0.1);	//path, pos, frameSize, sheetWidth, animationSeq, speed

	// Megaman assets
	/*this.player2_idle			= new Image('images/entities/MegamanX_SpriteSheet_Idle.png', this.pos, {'width': 136, 'height': 68}, true, 0.2);
	this.player2_moving			= new Image('images/entities/MegamanX_SpriteSheet_Run.png', this.pos, {'width': 680, 'height': 68}, true, 0.05);
	this.player2_jumping		= new Image('images/entities/MegamanX_SpriteSheet_Jump.png', this.pos, {'width': 476, 'height': 68}, true, 0.2);*/

	this.platformArr			= [];

	// sounds
	this.jumpSound				= new Sound('sounds/SFX_Jump_eBoing.wav', false, 'auto', 'none', 0.6);		//path, isLooping, preloaded, hasControls, vol
	this.landSound				= new Sound('sounds/SFX_Landing_eThud.wav', false, 'auto', 'none', 0.5);	//path, isLooping, preloaded, hasControls, vol

	// Megaman assets
	/*this.jumpSound				= new Sound('sounds/SFX_Jump_Megaman.wav', false, 'auto', 'none', 0.6);	//path, isLooping, preloaded, hasControls, vol
	this.landSound				= new Sound('sounds/SFX_Landing_Megaman.wav', false, 'auto', 'none', 0.5);	//path, isLooping, preloaded, hasControls, vol*/
}

// handleCollision
// When a player is moving, check to make sure it's not colliding with an object. If so, stop it.
// Called by itself (player) from applyPhysics()
Player.prototype.handleCollision = function () {
	var i, playerLeft, playerRight, playerTop, playerBottom, platLeft, platRight, platTop, platBottom;

	// Screen Bounds
	// X
	if (this.pos.x <= 0) {
		this.pos.x = 0;
	} else if (this.pos.x >= (main.CANVAS_WIDTH - this.size.width)) {
		this.pos.x = main.CANVAS_WIDTH - this.size.width;
	}
	// Y
	if (this.pos.y >= (main.CANVAS_HEIGHT - this.size.height)) {
		this.pos.y = main.CANVAS_HEIGHT - this.size.height;
		this.isJumping = false;
		if (!this.isOnGround) { this.landSound.play(); }
		this.isOnGround = true;
	}

	// Player Collision

	// Platform collision (only tops)
	playerLeft 		= this.pos.x;
	playerRight		= this.pos.x + this.size.width;
	playerTop		= this.pos.y;
	playerBottom	= this.pos.y + this.size.height;
	for (i = 0; i < this.platformArr.length; i++) {
		platLeft	= this.platformArr[i].pos.x;
		platRight	= this.platformArr[i].pos.x + this.platformArr[i].size.width;
		platTop		= this.platformArr[i].pos.y;
		platBottom	= this.platformArr[i].pos.y + this.platformArr[i].size.height;
		// Check for collision per platform
		//if ((this.pos.y + this.size.height) >= e.pos.y && (posY + this.size.height) <= (e.pos.y + e.size.height) && posX > e.pos.x && posX < (e.pos.x + e.size.width)) {
		if (playerBottom > platTop && playerBottom < platBottom) {
			this.pos.y = (this.platformArr[i].pos.y - this.size.height);
			this.isJumping = false;
			if (!this.isOnGround) { this.landSound.play(); }
			this.isOnGround = true;
		}

	}

};

// Update
// Updates member of the Player 'class' each frame
// Called by level.update
Player.prototype.update = function (platformArr) {
	var speed, d, gameTime;
	speed = (Input.Key.GetKey(Input.Key.SHIFT)) ? this.runSpeed : this.walkSpeed;

	this.platformArr = platformArr;

	// Horizontal Movement
	if (Input.Key.GetKey(Input.Key.A) && this.velocity.x > -speed) {
		this.velocity.x--;
		this.dir = 'LEFT';
	} else if (Input.Key.GetKey(Input.Key.D) && this.velocity.x < speed) {
		this.velocity.x++;
		this.dir = 'RIGHT';
	}

	// Jumping - FIX THIS (shouldn't get to the else until key is released)
	if (Input.Key.GetKey(Input.Key.SPACE) && !this.isJumping && !this.jumpLock) {
		this.isJumping = true;
		this.velocity.y = -this.jumpSpeed;
		this.jumpSound.play();
		this.isOnGround = false;
		this.jumpLock = true;
	} else {
		this.jumpLock = false;
	}

	// Ground Friction and Gravity
	this.velocity.x *= this.friction
	this.velocity.y += this.gravity;

	this.pos.x += this.velocity.x;
	this.pos.y += this.velocity.y;

	// Collision
	this.handleCollision();

	// Set animation sequence
	// Is the player jumping?	
	if (this.isJumping) {
		// Set animation sequence based on the player's facing direction
		this.animationSeq = (this.dir === 'RIGHT') ? 2 : 5;
		this.animationSpeed = 1;
	} else {
		// Check if player is Idle
		if (this.velocity.x < 1 && this.velocity.x > -1) {
			// Set animation sequence based on the player's facing direction
			this.animationSeq = (this.dir === 'RIGHT') ? 0 : 3;
			this.animationSpeed = 0.3;
		} else {
			// Set animation sequence based on the player's facing direction
			this.animationSeq = (this.dir === 'RIGHT') ? 1 : 4;
			this.animationSpeed = 0.05;
		}
	}
	// Update the player
	this.playerSprite.update(this.pos, this.animationSeq, this.animationSpeed);

};

// Draw
// Draws member of the Player 'class' each frame
// Called by Level.draw
Player.prototype.draw = function () {

	this.playerSprite.draw();

	// Megaman assets
	/*if (this.isJumping) {
		this.player2_jumping.draw(this.pos, this.dir);
	} else {

		// Reset jump animation
		this.player2_jumping.reset();

		if (this.velocity.x < 1 && this.velocity.x > -1) {
			this.player2_idle.draw(this.pos, this.dir);
		} else {
			this.player2_moving.draw(this.pos, this.dir);
		}
	}*/
};