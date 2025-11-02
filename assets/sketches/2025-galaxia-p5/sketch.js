// Parámetros editables
var CANT_ESTRELLAS = 2500;   // más = más densa (cuidado con el rendimiento)
var BRAZOS = 3;              // cantidad de brazos espirales
var GIRO_INICIAL = 0;        // rotación inicial de toda la galaxia
var VELOCIDAD_GIRO = 0.0008; // velocidad de rotación de la galaxia
var DISPERSION = 0.45;       // ruido lateral de los brazos (0 = súper definidos)
var RADIO_MAX = 420;         // tamaño aprox de la galaxia (en px)
var BRILLO_BASE = 220;       // brillo de estrellas (0–255)
var OPACIDAD = 180;          // opacidad de las estrellas (0–255)
var COLOR_TEMPERATURA = 0.35; // mezcla entre azules (0) y amarillos (1)

// Estado
var estrellas = [];
var t = 0;

// p5
function setup() {
  var lado = min(windowWidth, windowHeight);
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  noStroke();
  randomSeed(7); // reproducible, cambiá el número si querés otra galaxia

  // Precalcular estrellas en brazos espirales
  var i;
  for (i = 0; i < CANT_ESTRELLAS; i++) {
    // Ángulo base por brazo
    var brazo = floor(random(BRAZOS));
    var theta = random(0, TWO_PI);          // ángulo progresivo
    var avance = theta + (brazo * TWO_PI / BRAZOS);

    // Espiral tipo r = a * sqrt(theta) (crece suave)
    var r = RADIO_MAX * sqrt(theta / TWO_PI);

    // Ensanchar con ruido lateral
    var desvio = (random() - 0.5) * DISPERSION * RADIO_MAX / (1 + theta);

    // Posición en el brazo con pequeño ruido radial
    var x = (r + desvio) * cos(avance);
    var y = (r + desvio) * sin(avance);

    // Tamaño: estrellas más chicas hacia afuera
    var tam = map(r, 0, RADIO_MAX, 2.8, 0.6) + random(0.0, 0.8);

    // Color sencillo: mezcla frío-caliente
    var mix = COLOR_TEMPERATURA;
    var azul = lerp(180, 30, mix);
    var rojo = lerp(70, 255, mix);
    var verde = lerp(120, 240, mix);

    // Variación sutil por estrella
    var brillo = BRILLO_BASE + random(-40, 35);
    var a = OPACIDAD - map(r, 0, RADIO_MAX, 0, 120) + random(-10, 10);
    if (a < 20) { a = 20; }
    if (a > 255) { a = 255; }

    estrellas.push({
      x: x, y: y,
      tam: tam,
      r: rojo, g: verde, b: azul,
      brillo: brillo,
      parp: random(1000) // fase para “twinkle”
    });
  }
}

function draw() {
  // Fondo con leve “glow” central
  background(0, 8, 15);
  push();
  translate(width * 0.5, height * 0.5);

  // Giro global de la galaxia
  GIRO_INICIAL += VELOCIDAD_GIRO;

  rotate(GIRO_INICIAL);

  // Núcleo suave
  var gradios = 120;
  var i;
  for (i = gradios; i > 0; i--) {
    var alpha = map(i, 0, gradios, 120, 0);
    fill(255, 240, 210, alpha);
    ellipse(0, 0, i * 4, i * 4);
  }

  // Dibujar estrellas
  for (i = 0; i < estrellas.length; i++) {
    var e = estrellas[i];

    // Parpadeo muy leve
    var tw = 0.5 + 0.5 * sin(t * 2.2 + e.parp);
    var br = e.brillo * tw;

    fill(br * e.r / 255, br * e.g / 255, br * e.b / 255, OPACIDAD);

    // Ligero blur “pobre” con dos capas
    ellipse(e.x, e.y, e.tam * 1.6, e.tam * 1.6);
    fill(br * e.r / 255, br * e.g / 255, br * e.b / 255, OPACIDAD);
    ellipse(e.x, e.y, e.tam, e.tam);
  }

  pop();
  t += 0.01;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
