
var t = 0;
var W = 200;
var H = 200;
let lapse = 0;    // mouse timer

function setup() {
	createCanvas(1112, 834);
	colorMode(HSB, 255);
	smooth();
	noStroke();
}

function draw() {
	translate(0, 250);
	background(0, 100, 180);
	for(var i = W * H; --i; ) {
		var x = i % W;
		var z = parseInt(i / W);
		var y = noise(x / 30, z / 70 + t, 1);
		z *= .01;
		var a = (1 - y) * (z * 0.7) * 200;
		fill(0, 150, y * y * W);
		rect(500 + (x * 4 - W * 2) / z, y * 175 / z, 40 - z * 10, 400);//26 - z * 10);
	}
	
	t += deltaTime * .0005;
}

function mousePressed(){
// prevents mouse press from registering twice
  if (millis() - lapse > 400){
    save('pix.jpg');
    lapse = millis();
  }
}
