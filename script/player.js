/* JAVASCRIPT DOCUMENT (jQuery) - PLAYER */

function Player () {
	this.pos					= {'x': 100, 'y': -200};	// Fall in from the sky
	this.size					= {'width': 50, 'height': 50};
	this.velocity				= {'x': 0, 'y': 0};
	// Constants for controling horizontal movement
	this.MoveAcceleration 		= 500.0;	//7000.0;
	this.MaxMoveSpeed 			= 10; 		//1000.0;
	this.GroundDragFactor 		= 0.38;
	this.AirDragFactor 			= 0.48;
	// Constants for controlling vertical movement
	this.MaxJumpTime 			= 0.35;
	this.JumpLaunchVelocity 	= -250.0;
	this.GravityAcceleration 	= 170; 		//1700.0;
	this.MaxFallSpeed 			= 45;		//450.0;
	this.JumpControlPower 		= 0.13;

	this.isOnGround 			= false;
	this.movement 				= 0;
	this.isJumping 				= false;
	this.wasJumping 			= false;
	this.jumpTime 				= 0;

	this.timeSinceLastUpdate	= 0;

	this.localBounds 			= {'x': 0, 'y': 0, 'width': this.size.x, 'height': this.size.y};
	this.boundingRectangle 		= {	'left':	(Math.round(this.pos.x - (this.size.x / 2)) + this.localBounds.x),
									'top':	(Math.round(this.pos.y - (this.size.y / 2)) + this.localBounds.y),
									'width': this.localBounds.width,
									'height': this.localBounds.height
								};

	// Player Textures
	this.playerSprite			= new Animation('images/entities/Player2_SpriteSheet_MASTER.png', this.pos, 50, 450, this.animationSeq, 0.1);	//path, pos, frameSize, sheetWidth, animationSeq, speed

	// sounds
	this.moveSound				= new Sound('sounds/SFX_Scrape.mp3', true, 'auto', 'none', 0.2);		//path, isLooping, preloaded, hasControls, vol
	this.jumpSound				= new Sound('sounds/SFX_Jump_eBoing.wav', false, 'auto', 'none', 0.6);		//path, isLooping, preloaded, hasControls, vol
	this.landSound				= new Sound('sounds/SFX_Landing_eThud.wav', false, 'auto', 'none', 0.5);	//path, isLooping, preloaded, hasControls, vol

	// Megaman assets
	/*this.jumpSound				= new Sound('sounds/SFX_Jump_Megaman.wav', false, 'auto', 'none', 0.6);	//path, isLooping, preloaded, hasControls, vol
	this.landSound				= new Sound('sounds/SFX_Landing_Megaman.wav', false, 'auto', 'none', 0.5);	//path, isLooping, preloaded, hasControls, vol*/
}

// handleCollision
// When a player is moving, check to make sure it's not colliding with an object. If so, stop it.
// Called by itself (player) from applyPhysics()
Player.prototype.HandleCollision = function () {
	var i, playerLeft, playerRight, playerTop, playerBottom, platLeft, platRight, platTop, platBottom;

	this.isOnGround = false;

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
		//if (!this.isOnGround) { this.landSound.play(); }
		this.isOnGround = true;
	}

};

Player.prototype.GetInput = function () {

	// Horizontal Movement
	if (Input.Key.GetKey(Input.Key.A)) {
		this.movement = -1.0;
	} else if (Input.Key.GetKey(Input.Key.D)) {
		this.movement = 1.0;
	}

	this.isJumping = Input.Key.GetKey(Input.Key.SPACE);

};

Player.prototype.Clamp = function (value, min, max) {
	return (value < min) ? min : ((value > max) ? max : value);
};

Player.prototype.ApplyPhysics = function (gameTime) {

	var elapsed, previousPosition;
	elapsed				= gameTime - this.timeSinceLastUpdate;	// difference between now and the last update (in seconds)
	previousPosition	= this.pos;

	this.velocity.x		+= this.movement * this.MoveAcceleration;
	this.velocity.y		= this.Clamp(this.velocity.y + this.GravityAcceleration, -this.MaxFallSpeed, this.MaxFallSpeed);

	this.velocity.y		= this.DoJump(this.velocity.y, elapsed);

	// Apply pseudo-drag horizontally
	if (this.isOnGround) {
		this.velocity.x *= this.GroundDragFactor;
	} else {
		this.velocity.x *= this.AirDragFactor;
	}

	// Prevent player from running faster than top speed
	this.velocity.x = this.Clamp(this.velocity.x, -this.MaxMoveSpeed, this.MaxMoveSpeed);

	// Apply velocity to player
	this.pos.x += Math.round(this.velocity.x);
	this.pos.y += Math.round(this.velocity.y);

	this.timeSinceLastUpdate = gameTime;

	// Handle Collisions
	this.HandleCollision();

	/*if (this.pos.x === previousPosition.x) {
		this.velocity.x = 0;
	}

	if (this.pos.y === previousPosition.y) {
			this.velocity.y = 0;
	}*/

};

Player.prototype.DoJump = function (velY, gameTime) {

	// If the player wants to jump
	if (this.isJumping) {
		// Begin or continue a jump
		if ((!this.wasJumping && this.isOnGround) || this.jumpTime > 0.0) {
			if (this.jumpTime === 0){
				this.jumpSound.play();
			}

			this.jumpTime += gameTime;
			// jump animation here

		}
		// If we are in the ascent of the jump
		if (0.0 < this.jumpTime && this.jumpTime <= this.MaxJumpTime) {
			// Fully override the vertical velocity with a power curve that gives more control
			velY = this.JumpLaunchVelocity * (1 - Math.pow(this.jumpTime / this.MaxJumpTime, this.JumpControlPower));
		} else {
			// Reached the apex of the jump
			this.jumpTime = 0.0;
		}

	} else {
		//Continues not jumping or cancels a jump in progress
		this.jumpTime = 0.0;
	}

	this.wasJumping = this.isJumping;
	return velY;

};

// Update
// Updates member of the Player 'class' each frame
// Called by level.update
Player.prototype.update = function (gameTime) {

	this.GetInput();
	this.ApplyPhysics(gameTime);

	// Movement Sounds
	if (!this.isJumping && (this.velocity.x <= -0.1 || this.velocity.x >= 0.1)) {
		this.moveSound.play();
	} else {
		this.moveSound.stop();
	}

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

	// Clear inputs
	this.movement = 0;
	this.isJumping = false;

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