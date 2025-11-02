
// ------ VARIABLES GLOBALES ------
var t = 0;
var stars = [];
var numStars = 250;

// ------ SETUP ------
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  var i = 0;
  while (i < numStars) {
    var sx = random(width);
    var sy = random(height * 0.6); // estrellas solo en el cielo
    var sb = random(180, 255);
    stars.push({ x: sx, y: sy, b: sb, n: random(1000) });
    i = i + 1;
  }
}

// ------ DRAW ------
function draw() {
  drawNightSkyGradient();
  drawStars();
  drawAuroraBands();
  drawMartianHorizon();
  drawGroundGlow();
  t = t + 0.005;
}

// ------ CIELO AZUL PROFUNDO CON GRADIENTE ------
function drawNightSkyGradient() {
  var yPos = 0;
  while (yPos < height) {
    var inter = map(yPos, 0, height, 0, 1);

    // arriba: casi negro azulado
    var rTop = 5;
    var gTop = 10;
    var bTop = 20;

    // abajo: un azul más turquesa oscuro
    var rBot = 10;
    var gBot = 40;
    var bBot = 60;

    var rNow = lerp(rTop, rBot, inter);
    var gNow = lerp(gTop, gBot, inter);
    var bNow = lerp(bTop, bBot, inter);

    stroke(rNow, gNow, bNow);
    line(0, yPos, width, yPos);

    yPos = yPos + 2;
  }
  noStroke();
}

// ------ ESTRELLAS CON LEVE PARPADEO ------
function drawStars() {
  var i = 0;
  while (i < stars.length) {
    var s = stars[i];

    // flicker leve
    var flick = sin(frameCount * 0.02 + s.n) * 40;
    var bright = s.b + flick;

    fill(bright);
    rect(s.x, s.y, 2, 2);
    i = i + 1;
  }
}

// ------ AURORAS EN BANDAS LARGAS DIAGONALES ------
function drawAuroraBands() {
  // vamos a dibujar varias cintas suaves que atraviesan la pantalla
  // usamos blendMode(ADD) para que brille tipo luz
  blendMode(ADD);

  // cuántas tiras grandes
  var bandCount = 3;
  var b = 0;
  while (b < bandCount) {

    // cada banda tiene varias capas verticales para dar grosor difuso
    var layer = 0;
    var bandThickness = 60; // px aprox
    while (layer < bandThickness) {

      var alphaLayer = map(layer, 0, bandThickness, 70, 0);

      // verde marciano brillante tirando al cian
      // podés empujar más al verde fosfo con g alto
      var rA = 80;
      var gA = 255;
      var bA = 140;
      var aA = alphaLayer;

      stroke(rA, gA, bA, aA);
      strokeWeight(2);
      noFill();

      beginShape();

      // ángulo diagonal:
      // vamos a usar x pero desplazar la "altura base" según banda
      // y según t para que se mueva lento
      var xPos = -100;
      while (xPos <= width + 100) {

        // baseY: altura general donde pasa la banda
        // b controla qué banda es (una más alta, otra media, otra baja)
        // layer mete el grosor
        var baseY = map(b, 0, bandCount - 1, height * 0.15, height * 0.5)
                    + layer * 0.4;

        // inclinación diagonal tipo "pasa de arriba izq a derecha"
        // si xPos crece, y sube un poco o baja un poco
        var diagonalTilt = xPos * 0.1 * map(b, 0, bandCount - 1, -0.003, 0.003);

        // ondulación suave con noise para hacerla orgánica
        var wave = map(
          noise(
            xPos * 0.002 + b * 10,
            t * 0.5 + layer * 0.01
          ),
          0, 1,
          -80, 80
        );

        // altura final del punto de la banda
        var yPos = baseY + wave + diagonalTilt;

        curveVertex(xPos, yPos);

        xPos = xPos + 30;
      }

      endShape();

      layer = layer + 1;
    }

    b = b + 1;
  }

  blendMode(BLEND);
}

// ------ HORIZONTE MARCIANO OSCURO (VALLE / CRÁTER) ------
function drawMartianHorizon() {
  noStroke();

  // silueta: muy baja, casi toda la pantalla es cielo
  // vamos a generar un terreno rocoso oscuro
  fill(20, 10, 5); // base super oscura

  beginShape();
  var groundLineY = height * 0.7;
  var x2 = 0;
  while (x2 <= width) {
    // relieve con ruido para que tenga cráteres/paredes
    var yRelief = groundLineY
      - map(noise(x2 * 0.002, 999), 0, 1, 0, 120);
    vertex(x2, yRelief);
    x2 = x2 + 20;
  }
  // cerrar con los bordes inferiores
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

// ------ GLOW VERDE SOBRE EL SUELO (REFLEJO DE LA AURORA) ------
function drawGroundGlow() {
  // Vamos a pintar un gradiente verde suave desde abajo del canvas
  // hasta un poco arriba del horizonte, solo en la zona central.
  var glowTop = height * 0.7;
  var glowBottom = height;
  var y = glowTop;
  while (y < glowBottom) {
    var inter = map(y, glowTop, glowBottom, 0, 1);

    // color: un verde amarillento suave y oscuro, muy transparente
    var rG = lerp(20, 80, inter);
    var gG = lerp(40, 255, inter);
    var bG = lerp(20, 120, inter);

    fill(rG, gG, bG, 30);
    rect(0, y, width, 2);

    y = y + 2;
  }
}

// ------ RESPONSIVE ------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}




