/* JAVASCRIPT (jQuery) */

var main = {
	init: function () {
		this.isRunning			= true;
		this.FPS				= 30;
		this.CANVAS_WIDTH		= 1000;
		this.CANVAS_HEIGHT		= 455;
		this.canvas				= $('#gameArea')[0];
		this.context			= this.canvas.getContext('2d');;
		this.level				= new Level();
		this.update				= main.update;
		this.draw				= main.draw;

		// Set up canvas
		$('#wrapper').width(this.CANVAS_WIDTH).height(this.CANVAS_HEIGHT);
		main.canvas.width = this.CANVAS_WIDTH;
		main.canvas.height = this.CANVAS_HEIGHT;

		// Initialize inputs
		window.addEventListener('keyup', function (e) { Input.Key.onKeyUp(e); }, false);
		window.addEventListener('keydown', function (e) { Input.Key.onKeyDown(e); }, false);
		this.canvas.addEventListener('mouseup', function (e) { Input.Mouse.OnMouseUp(e); }, false);
		this.canvas.addEventListener('mousedown', function (e) { Input.Mouse.OnMouseDown(e); }, false);

		// Main loop
		main.gameLoop();

	},
	gameLoop: function () {
		setInterval(function () {
			if (main.isRunning) {
				main.update();
				main.draw();
			}
		}, 1000/main.FPS);
	},
	update: function () {
		main.level.update();
	},
	draw: function () {
		main.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
		main.level.draw();
	}

};


///	ONLOAD FUNCTION
///	This is the entry point
$(function () { main.init(); });