let t = 0; //tiempo para animaciones
let stars = [];
let numStars = 250; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  let i = 0; 
  while (i < numStars) { 
    let sx = random(width); //posición x aleatoria
    let sy = random(height * 0.6); //posición y aleatoria (solo en la parte superior)
    let sb = random(180, 255); //brillo inicial aleatorio
    stars.push({ x: sx, y: sy, b: sb, n: random(1000) }); //n para variación de flicker.  n significa "noise offset". b es brillo
    i = i + 1;
  }
}

function draw() {
  drawNightSkyGradient(); 
  drawStars();
  drawAuroraBands();
  drawMartianHorizon();
  drawGroundGlow();
  t = t + 0.005; //incrementar tiempo
}

function drawNightSkyGradient() {
  let yPos = 0; //posición y inicial
  while (yPos < height) { //recorrer todo el alto del canvas
    let inter = map(yPos, 0, height, 0, 1); //interpolación de 0 (arriba) a 1 (abajo). map(valor, min1, max1, min2, max2)

    //arriba: casi negro azulado
    let rTop = 5; 
    let gTop = 10;
    let bTop = 20;

    //abajo: un azul más turquesa oscuro
    let rBot = 10;
    let gBot = 40;
    let bBot = 60;

    let rNow = lerp(rTop, rBot, inter); //lerp significa 
    let gNow = lerp(gTop, gBot, inter); 
    let bNow = lerp(bTop, bBot, inter);

    stroke(rNow, gNow, bNow); 
    line(0, yPos, width, yPos);

    yPos = yPos + 2; 
  }
  noStroke();
}

function drawStars() {
  let i = 0;
  while (i < stars.length) { 
    let s = stars[i]; 

    //flicker leve
    let flick = sin(frameCount * 0.02 + s.n) * 40; //oscilación suave por fotograma para el parpadeo de cada estrella. frameCount * 0.02 controla la velocidad; s.n es el desfase individual.se escala a ±40 y luego se suma a s.b
    let bright = s.b + flick; 

    fill(bright);
    rect(s.x, s.y, 2, 2); 
//dibuja la "estrella" como un rectángulo de 2×2 en la posición s.x, s.y usando el fill actual.
//rect se dibuja con el modo por defecto (esquina superior izquierda); 
rect(s.x, s.y, 2),
    i = i + 1;
  }
}

function drawAuroraBands() {
  //auroras tipo tiras difusas verdes
  //usamos blendMode(ADD) para que brille tipo luz
  blendMode(ADD);

  //cuántas tiras grandes
  let bandCount = 3;
  let b = 0;
  while (b < bandCount) {
    //cada banda tiene varias capas verticales para dar grosor difuso
    let layer = 0;
    let bandThickness = 60; //px aprox
    while (layer < bandThickness) { //capas por banda
      //alpha va de 70 (casi visible) a 0 (invisible) según capa
      let alphaLayer = map(layer, 0, bandThickness, 70, 0);
      // verde marciano brillante tirando al cian
      let rA = 80;
      let gA = 255;
      let bA = 140;
      let aA = alphaLayer; 

      stroke(rA, gA, bA, aA);
      strokeWeight(2);
      noFill();

      beginShape();
      //ángulo diagonal:
      //voy a usar x pero desplazar la "altura base" según banda
      //y según t para que se mueva lento
      let xPos = -100; //empezar un poco antes del canvas
      while (xPos <= width + 100) { //terminar un poco después del canvas

        //baseY: altura general donde pasa la banda
        //b controla qué banda es (una más alta, otra media, otra baja)
        //layer mete el grosor
        let baseY = map(b, 0, bandCount - 1, height * 0.15, height * 0.5) // altura según banda. la banda más alta está en 15% del alto, la más baja en 50%. map(valor, min1, max1, min2, max2)
                    + layer * 0.4; // grosor de la banda

        //inclinación diagonal tipo "pasa de arriba izq a derecha"
        //si xPos crece, y sube un poco o baja un poco
        let diagonalTilt = xPos * 0.1 * map(b, 0, bandCount - 1, -0.003, 0.003); //la banda más alta se inclina levemente hacia abajo, la más baja levemente hacia arriba

        //ondulación suave con noise para hacerla orgánica
        let wave = map(noise(xPos * 0.002 + b * 10,t * 0.5 + layer * 0.01),0, 1,-80, 80); //onda vertical según x y t. noise(valorX, valorY) da valores entre 0 y 1. map para escalar a -80 a 80. el calculo significa que la onda cambia lentamente con t y varía un poco según la capa

        //altura final del punto de la banda
        let yPos = baseY + wave + diagonalTilt; //posición y final sumando todo

        curveVertex(xPos, yPos); //punto de la forma

        xPos = xPos + 30; //incrementar x
      }

      endShape();

      layer = layer + 1;
    }

    b = b + 1; //siguiente banda
  }

  blendMode(BLEND); //volver al modo normal
}

function drawMartianHorizon() {
  noStroke();

  //silueta: muy baja, casi toda la pantalla es cielo
  //terreno rocoso oscuro
  fill(20, 10, 5); //base super oscura

  beginShape();
  let groundLineY = height * 0.7; //línea base del horizonte
  let x2 = 0; //empezar en x=0
  while (x2 <= width) { //recorrer todo el ancho
    //relieve con ruido para que tenga cráteres/paredes
    let yRelief = groundLineY - map(noise(x2 * 0.002, 999), 0, 1, 0, 120); //ruido según x2 para variar. map para escalar a 0-120px de altura. la cuenta significa que el ruido varía lentamente con x2. 999 es un valor fijo para la segunda dimensión del ruido
    vertex(x2, yRelief); //punto del contorno
    x2 = x2 + 20; //incrementar x2
  }
  //cerrar con los bordes inferiores
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function drawGroundGlow() {
  //pintar un gradiente verde suave desde abajo del canvas
  //hasta un poco arriba del horizonte, solo en la zona central
  let glowTop = height * 0.7; //comenzar justo en el horizonte
  let glowBottom = height; //terminar en el fondo del canvas
  let y = glowTop; //posición y inicial
  while (y < glowBottom) { //recorrer hasta el fondo
    let inter = map(y, glowTop, glowBottom, 0, 1); //interpolación de 0 (horizonte) a 1 (fondo)

    //color: un verde amarillento suave y oscuro, muy transparente
    let rG = lerp(20, 80, inter);
    let gG = lerp(40, 255, inter);
    let bG = lerp(20, 120, inter);

    fill(rG, gG, bG, 30);
    rect(0, y, width, 2);

    y = y + 2;
  }
}





