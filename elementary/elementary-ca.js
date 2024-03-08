(function () {
	let print = console.log.bind(console);
  
	const SCREENWIDTH = 350;
	const SCREENHEIGHT = 300;
	const pixelSize = 2;
	
	let ruleNo;
	let iteration = document.getElementById("iteration");
	
	let iter = 0;
	let targetFrametime = 1000; // 1 second
	let framerate = 60; // frames
	
	let previousTime;
	let currentTime;
	
	document.getElementById("width").innerHTML = SCREENWIDTH;
	document.getElementById("height").innerHTML = SCREENHEIGHT;
	let ruleNoLabel = document.getElementById("rulenumber");
  
	// helper functions
	function isInBounds(x, y) {
	  return x < SCREENWIDTH && x >= 0 && y < SCREENHEIGHT && y >= 0;
	}
  
	// javascript does not have a well defined modulo function when negative numbers are involved
	function mod(n, m) {
	  return ((n % m) + m) % m;
	}
  
	class Screen {
	  constructor(width, height) {
		this.width = width;
		this.height = height;
		this.buffer = new Buffer(width, height);
		this.buffer.set(Math.floor(width / 2), 0, 1); // set center cell to be active for 1st generation
		this.running = false;
  
		this.canvas = document.getElementById("canvas");
		this.canvas.width = width * pixelSize;
		this.canvas.height = height * pixelSize;
  
		this.ctx = this.canvas.getContext("2d");
		
		this.runButton = document.getElementById("run");
		this.runButton.addEventListener("click", this.run.bind(this), false);
	  }
  
	  update() {
		let row = iter;
		if (iter < SCREENHEIGHT) {
		  for (let col = 0; col < SCREENWIDTH; col++) {
			let left = this.buffer.get(col - 1, row);
			let curr = this.buffer.get(col, row);
			let right = this.buffer.get(col + 1, row);
			let result = this.calculateState(left, curr, right);
			this.buffer.set(col, row + 1, result);
		  }
		} else {
		  this.running = false;
		  this.runButton.innerHTML = "Reset";
		}
	  }
  
	  calculateState(left, curr, right) {
		let neighborhood = "" + left + curr + right;
		let value = 7 - parseInt(neighborhood, 2);
		let ruleset = ruleNo.toString(2).padStart(8, "0");
  
		return parseInt(ruleset[value]);
	  }
  
	  render() {
		for (let y = 0; y < SCREENHEIGHT; y++) {
		  for (let x = 0; x < SCREENWIDTH; x++) {
			if (this.buffer.get(x, y)) {
			  this.ctx.fillRect(
				x * pixelSize,
				y * pixelSize,
				pixelSize,
				pixelSize
			  );
			}
		  }
		}
	  }
  
	  clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	  }
  
	  drawGrid() {
		this.ctx.beginPath();
		for (let x = 0; x <= this.canvas.width; x += pixelSize) {
		  this.ctx.moveTo(x, 0);
		  this.ctx.lineTo(x, this.canvas.height);
		}
		this.ctx.closePath();
		this.ctx.stroke();
  
		this.ctx.beginPath();
		for (let y = 0; y <= this.canvas.height; y += pixelSize) {
		  this.ctx.moveTo(0, y);
		  this.ctx.lineTo(this.canvas.width, y);
		}
		this.ctx.closePath();
		this.ctx.stroke();
	  }
  
	  tick() {
		this.update();
		this.render();
	  }
	  
	  loop() {
		currentTime = Date.now();
		if (this.running) {
		  if (
			previousTime == undefined ||
			currentTime - previousTime >= targetFrametime / framerate
		  ) {
			this.tick();
			iteration.innerHTML = iter++;
			previousTime = currentTime;
		  }
		  requestAnimationFrame(() => this.loop());
		}
	  }
	  
	  run() {
		this.running = !this.running;
		if (iter > SCREENHEIGHT) {
		  this.reset();
		}
		// check if input is not empty or not an
		ruleNo = parseInt(document.getElementById("ruleset").value);
		if (Number.isNaN(ruleNo)) {
		  return;
		}
		// check if input is not a negative number
		if (ruleNo < 0) {
		  return;
		}
		ruleNoLabel.innerHTML = ruleNo;
		if (this.running) {
		  this.runButton.innerHTML = "Pause";
		  requestAnimationFrame(this.loop.bind(this));
		} else {
		  this.runButton.innerHTML = "Run";
		}
	  }
	  
	  reset() {
		this.clear();
		this.buffer.reset();
		this.buffer.set(Math.floor(SCREENWIDTH / 2), 0, 1);
		iter = 0;
	  }
	}
  
	class Buffer {
	  constructor(width, height) {
		this.buffer = new Array(width * height).fill(0);
	  }
  
	  set(x, y, val) {
		if (isInBounds(x, y)) {
		  this.buffer[y * SCREENWIDTH + x] = val;
		}
	  }
  
	  get(x, y) {
		if (x > SCREENWIDTH || x < 0) {
		  x = mod(x, SCREENWIDTH);
		}
		return this.buffer[y * SCREENWIDTH + x];
	  }
	  
	  reset() {
		this.buffer.fill(0);
	  }
	}
	
	let myscreen = new Screen(SCREENWIDTH, SCREENHEIGHT);
  })();
  