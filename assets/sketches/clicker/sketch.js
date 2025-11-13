let showDebug = false; //la uso para decidir si muestro o no la elipse verde que marca la zona clickeable
let mars; //variable para guardar la imagen de marte

//contador de clicks dentro de la elipse
let clicksEllipse = 0;

//propiedades de la elipse
let xE, yE, wE, hE; //xE: posición X del centro de la elipse (y de la imagen). yE: posición Y del centro de la elipse. wE: ancho de la elipse. hE: alto de la elipse. no se les doy valor todavía, se asignan en setup().

function preload() { //preload() es una función especial de p5.js. se ejecuta antes de setup() y se usa para cargar recursos (imágenes, sonidos, etc.) antes de que empiece el sketch.
  mars = loadImage("mars.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  //variables de la elipse
  xE = width / 2; //xE = width / 2; width es el ancho actual del canvas. width / 2 es el centro horizontal → la posición X donde se va a ubicar marte.
  yE = height / 2; //yE = height / 2; height es el alto actual del canvas. height / 2 es el centro vertical → la posición Y donde se va a ubicar marte.
  wE = 300; //ancho de la elipse
  hE = 300; //alto de la elipse

  //ajusto el tamaño de la imagen de Marte
  mars.resize(300, 300); //coincide con wE y hE, para que la imagen calce justo en esa zona

  imageMode(CENTER); //configuro el modo de dibujo de imágenes para que se dibujen desde el centro (en vez de desde la esquina superior izquierda)
}

function draw() {
  background(0);
  image(mars, xE, yE);

  if (showDebug) { //solo ejecuta el bloque si showDebug es true.
    noFill();
    stroke(0, 255, 0);
    strokeWeight(2);
    ellipse(xE, yE, wE, hE); //dibuja una elipse centrada en (xE, yE) de tamaño wE x hE.
  }

  //texto con el número de clics
  fill(0, 0, 255); //azul
  stroke(255);
  strokeWeight(4);
  textSize(40);
  textAlign(CENTER, CENTER);
  text(clicksEllipse, xE, yE); //dibuja el valor actual de clicksEllipse (un número) en el punto (xE, yE). con la alineación centrada, ese número queda justo en el medio de la imagen.
}

//se llama una vez por cada clic
function mouseClicked() {
  let radio = (wE + hE) / 4; /* calcula un valor de radio aproximado para la zona circular:
wE es el ancho de la elipse. hE es el alto de la elipse. (wE + hE) / 2 sería el promedio de los dos diámetros. dividir por 4 es como hacer (wE/2 + hE/2) / 2, quedándote con un radio intermedio.
en la práctica, como wE y hE son 300, esto queda: (300 + 300) / 4 = 600 / 4 = 150.
O sea, un radio de 150 píxeles (coincide con la mitad de 300 → círculo). */
  let d = dist(mouseX, mouseY, xE, yE); /* calcula la distancia d entre:
la posición del mouse (mouseX, mouseY) en el momento del clic, y el centro de la elipse (xE, yE).
dist(a, b, c, d) calcula la distancia real entre los puntos (a, b) y (c, d) */

  if (d <= radio) {
    clicksEllipse++;
  } /* pregunta: ¿la distancia desde el mouse al centro es menor o igual al radio que definimos?
si sí, significa que el clic cayó dentro del círculo imaginario (el área de Marte).
si no, no hace nada.
clicksEllipse++;
suma 1 al contador de clics. ese nuevo valor se va a mostrar en la siguiente ejecución de draw().*/
}
