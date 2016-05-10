/* JAVASCRIPT (jQuery) Document - INPUT */

var Input = {
	Key: {
		_isPressed: {},
		isLocked: false,
		W: 87,
		A: 65,
		S: 83,
		D: 68,
		SPACE: 32,
		SHIFT: 16,
		ONE: 49,
		TWO: 50,
		THREE: 51,
		ZERO: 48,
		GetKey: function (keyCode) {
			return Input.Key._isPressed[keyCode];
		},
		onKeyDown: function (e) {
			Input.Key._isPressed[e.keyCode] = true;
		},
		onKeyUp: function (e) {
			var allAudio;
			if (e.keyCode === 80) {
				allAudio = $('audio');
				console.log(allAudio);
				// Pause or un-pause the game
				if (main.isRunning) {
					main.isRunning = false;
					$.each($('audio'), function () {
					    this.pause();
					});
				} else {
					main.isRunning = true;
					$.each($('audio'), function () {
						this.play();
					});
				}
			}
			delete Input.Key._isPressed[e.keyCode];
		}
	},
	Mouse: {
		_isPressed: {},
		pos: {'x': 0, 'y': 0},
		LEFT: 0,
		MIDDLE: 1,
		RIGHT: 2,
		GetButton: function (button) {
			return Input.Mouse._isPressed[button];
		},
		GetPosition: function () {
			return Input.Mouse.pos;
		},
		OnMouseDown: function (e) {
			Input.Mouse.pos.x = e.offsetX;
			Input.Mouse.pos.y = e.offsetY;
			Input.Mouse._isPressed[e.button] = true;
		},
		OnMouseUp: function (e) {
			delete Input.Mouse._isPressed[e.button];
		},
		OnMouseMove: {
			pos: {x: 0, y: 0},
			GetPosition: function () { return Input.Mouse.OnMouseMove.pos; },
			SetPosition: function (e) {
				Input.Mouse.OnMouseMove.pos.x = e.offsetX;
				Input.Mouse.OnMouseMove.pos.y = e.offsetY;
			}
		}
	},
	lockInput: function (isLocked) {
		//return
	}
};