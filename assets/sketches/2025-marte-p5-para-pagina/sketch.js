let s = ' Planet: Mars';
let t = ' Nickname: The Red Planet'
let u = '"Mars aka the Red Planet, is the fourth planet in our solar system. According to NASA,there was once water on this desert planet."'
let v = '"Ruuuuunn Mars!!! The colonizers are coming!!! Elon coming for that ass!"'

const stars = [];

function preload(){
  img1 =loadImage("Images/Mars.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i < 100; ++i) {
    stars.push([random(width), random(height)]);
  }
}

function draw() {
  background(20); 
  stroke(300);
  strokeWeight(8);
  stars.forEach(star => {
    point(...star);
  });
  
  
  Mercury();
  thruster();
  leftfin();
  rightfin();
  nose();
  glass();
  mainbody();
  midfin();
  computer();
  jenkins();
  johnson(); 
}

function Mercury(){
image(img1,540,-100,450,450);
}

function leftfin() {
c=color(150,0,0)
fill(c)
stroke(20)
strokeWeight(2)
beginShape();
curveVertex(750, 540);
curveVertex(723, 525);
curveVertex(680, 600);
curveVertex(715, 620);
curveVertex(753, 639);
curveVertex(715, 620);
endShape();
}

function rightfin() {
c=color(150,0,0)
fill(c)
stroke(20)
strokeWeight(2)
beginShape();
curveVertex(780, 540);
curveVertex(807, 518);
curveVertex(855, 600);
curveVertex(820, 620);
curveVertex(782, 639);
curveVertex(820, 620);
endShape();
}

function nose(){
  c=color(150,0,0)
  fill(c)
  stroke(20)
  strokeWeight(2)
  ellipse (767.5,520,88,200)
}

function glass(){
  c = color(0, 200, 300)
  fill(c)
  stroke(20)
  strokeWeight(1)
  ellipse (767.5,535,80,205)
  line(753, 440, 765, 460)
  line(782, 440, 765, 470)
}

function mainbody(){
  c=color(244, 244,240)
  fill(c)
  stroke(20)
  strokeWeight(2)
  ellipse (767.5,550,95,200)
}

function midfin(){
  c=color(150,0,0)
  fill(c)
  stroke(20)
  strokeWeight(2)
  ellipse (767.5,625,25,100)
  line(767.5, 640, 767.5, 590)
  line(767.5, 650, 767.5, 670)
}

function thruster(){
  c=color(90)
  fill(c)
  stroke(20)
  strokeWeight(2)
  quad(745, 630, 735, 665, 800, 665, 790, 630);
  line(740, 650, 794, 650)
}

function computer() {
  c = color(36,143,62);
  fill (c);
  text(s, 10, 440, 100, 80);
  text(t, 10, 460, 200, 80);
}

function jenkins() {
  c = color(0,125,255);
  fill (c);
  text(v, 10, 570, 350, 80);
}

function johnson() {
  c = color(255,0,0);
  fill (c);
  text(u, 10, 520, 350, 80);
}