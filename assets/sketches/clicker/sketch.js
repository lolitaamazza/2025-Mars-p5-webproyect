// mars: https://static.scientificamerican.com/sciam/cache/file/C454F5A6-536E-4C9F-AA6AF354BB85A85B.jpg

// Usamos un boolean por si querés ver o no la zona de clic
let showDebug = false;
let mars;

// Contador de clicks dentro de la elipse
let clicksEllipse = 0;

// Propiedades de la elipse
let xE, yE, wE, hE;

function preload() {
  // Asegurate de que mars.png esté en la MISMA carpeta que este sketch
  // o ajustá la ruta, por ejemplo: "imgs/mars.png"
  mars = loadImage("mars.png");
}

// Se ejecuta una vez al principio
function setup() {
  // Canvas normal, sin funciones extra
  createCanvas(windowWidth, windowHeight);

  // Color de fondo inicial
  background(0);

  // Centro y tamaño de la elipse (y de la imagen)
  xE = width / 2;
  yE = height / 2;
  wE = 300;
  hE = 300;

  // Ajusto el tamaño de la imagen de Marte
  mars.resize(300, 300);

  imageMode(CENTER);
}

// Se ejecuta en loop
function draw() {
  // Fondo negro cada frame
  background(0);

  // Dibujo la imagen de Marte en el centro
  image(mars, xE, yE);

  // Si querés ver el área de clic, poné showDebug = true;
  if (showDebug) {
    noFill();
    stroke(0, 255, 0);
    strokeWeight(2);
    ellipse(xE, yE, wE, hE); // zona donde cuenta el clic
  }

  // Texto con el número de clics
  fill(0, 0, 255); // azul
  stroke(255);
  strokeWeight(4);
  textSize(40);
  textAlign(CENTER, CENTER);
  text(clicksEllipse, xE, yE);
}

// Se llama una vez por cada clic
function mouseClicked() {
  // Comprobamos si el mouse está dentro de la elipse
  // Para simplificar, la tratamos como un círculo usando el promedio del ancho y alto
  let radio = (wE + hE) / 4; // promedio del radio ancho/alto
  let d = dist(mouseX, mouseY, xE, yE);

  if (d <= radio) {
    clicksEllipse++;
  }
}
