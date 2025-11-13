//capas internas de MARTE
let marsLayers = [
  { name: "Corteza",                color: "#C7613C", thickness: 50 }, 
  { name: "Manto",                  color: "#F29B4B", thickness: 1500 },
  { name: "Núcleo externo líquido", color: "#F9D36C", thickness: 900 },
  { name: "Núcleo interno",         color: "#FFECA0", thickness: 400 }
];

let totalThickness; //variable donde luego guardo la suma total de los espesores de todas las capas
let stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, CENTER);
  noStroke();

   //suma total de espesores para hacer proporciones
  totalThickness = 0; //inicializo la variable
  for (let i = 0; i < marsLayers.length; i++) { //recorre cada capa del array marsLayers
    totalThickness += marsLayers[i].thickness; //a totalThickness le sumamos el thickness de la capa actual. al final del bucle, totalThickness es la suma de todas las capas
  }

  //genero 220 estrellas de fondo (solo una vez)
  for (let i = 0; i < 220; i++) {
    stars.push({ //agrego un objeto al array stars con propiedades x, y, r y alpha
      x: random(width), //posición X aleatoria entre 0 y width
      y: random(height), //posición Y aleatoria entre 0 y height
      r: random(1, 3), //radio aleatorio entre 1 y 3
      alpha: random(80, 200) //valor de transparencia aleatorio entre 80 y 200. (80 = más transparente, 200 = más opaca)
    });
  }
}

function draw() {
  drawSpaceBackground(); //llamo a una función que dibuja el fondo con estrellas

  //posiciones base
  let cxPlanet = width * 0.32; //centro X del planeta “externo”: 32% del ancho del canvas
  let cyPlanet = height * 0.55; //centro Y del planeta: 55% de la altura del canvas
  let planetRadius = 210; //radio del círculo grande de Marte (superficie)

  //marte “completo” de fondo
  drawMarsSurface(cxPlanet, cyPlanet, planetRadius);  //llama a drawMarsSurface pasando: centro X,centro Y, radio

  //corte interno (tipo infografía)
  let cxCut = cxPlanet + 110; //centro X del corte interno, desplazado 110 px a la derecha del centro del planeta
  let cyCut = cyPlanet - 40; //centro Y del corte interno, desplazado 40 px hacia arriba del centro del planeta
  let cutMaxRadius = 150; //radio máximo del corte interno
  drawMarsInterior(cxCut, cyCut, cutMaxRadius); //lama a drawMarsInterior para dibujar todas las capas concéntricas

  drawTitleBlock(); //título y texto descriptivo
  drawLegend(); //leyenda de colores a la derecha
  drawNumbersPanel(); //panel con datos numéricos
}

function drawSpaceBackground() {
  background(5, 8, 20); //negro azulado

  for (let i = 0; i < stars.length; i++) { //recorre todas las estrellas guardadas en el array stars
    let s = stars[i]; //s es la estrella actual (un objeto con x, y, r, alpha)
    fill(255, s.alpha); //color blanco con transparencia s.alpha
    circle(s.x, s.y, s.r); //dibuja un círculo en esa posición con ese radio
  }
}

function drawMarsSurface(cx, cy, r) { //Declaro función que recibe: cx: centro X, cy: centro Y, r: radio
  //circulo principal
  fill("#B44830");
  ellipse(cx, cy, r * 2, r * 2); //círculo (elipse) de diámetro r*2 en X e Y.

  //manchas de relieve (volcanes, cráteres)
  fill(180, 60); //sombra suave
  ellipse(cx - 40, cy - 30, r * 0.9, r * 0.7); //dibuja una mancha en una zona distinta y con tamaño distinto.
  ellipse(cx + 60, cy + 10, r * 0.6, r * 0.5); 
  ellipse(cx - 70, cy + 40, r * 0.4, r * 0.3);
}

//capas internas
function drawMarsInterior(cx, cy, maxRadius) { //función que dibuja las capas concéntricas. recibe: cx: centro X, cy: centro Y, maxRadius: radio máximo
  let currentRadius = maxRadius; //inicializo variable para ir reduciendo el radio a medida que dibujo capas. currentRadius arranca siendo el radio máximo (capa exterior)

  for (let i = 0; i < marsLayers.length; i++) { //recorre todas las capas del array marsLayers
    let layer = marsLayers[i]; //capa actual

    //proporción de esta capa respecto del total
    let frac = layer.thickness / totalThickness; //qué fracción del total representa esta capa: por ejemplo, si su grosor es 400 y el total es 2800, entonces frac ≈ 0.14.
    let radialThickness = frac * maxRadius; //grosor radial de esta capa en pixeles: multiplico la fracción por el radio máximo. siguiendo el ejemplo anterior, si frac ≈ 0.14 y maxRadius = 150, entonces radialThickness ≈ 21 px.

    fill(layer.color); //color de relleno según la capa actual
    ellipse(cx, cy, currentRadius * 2, currentRadius * 2); //dibuja un círculo con el radio actual (diámetro = radio * 2)

    //actualizo el radio actual restándole el grosor radial de esta capa, para la siguiente iteración del bucle
    currentRadius -= radialThickness;
  }
}

//título y texto 
function drawTitleBlock() {
  textAlign(LEFT, TOP); 

  //“MARS” arriba a la izquierda
  fill(255);
  textSize(40); 
  textFont("Audiowide");
  text("MARS", 40, 40); //(x=40, y=40)

  //subtítulo/descripción
  textSize(14);
  fill(215);
  text(
    "Estructura interna de Marte (esquema simplificado).\n" + //n es para salto de línea
    "Los círculos muestran las capas internas con diferentes colores.",
    40, //x=40
    90 //y=90
  );
}

//colores y nombres de capas a la derecha

function drawLegend() { 
  let legendX = width * 0.62; //X donde empieza la leyenda (62% del ancho)
  let legendTop = 150; //Y del inicio de la lista
  let boxSize = 22; //tamaño del cuadradito de color
  let rowHeight = 32; //altura de cada fila (espacio entre filas)

  textAlign(LEFT, CENTER);

  fill(255);
  textSize(20);
  text("Capas internas", legendX, legendTop - 40); //pone el título “Capas internas” encima de la lista

  textSize(14);
  for (let i = 0; i < marsLayers.length; i++) { //recorre todas las capas del array marsLayers
    let layer = marsLayers[i]; //capa actual
    let y = legendTop + i * rowHeight; //posición Y de esta fila: empieza en legendTop y suma rowHeight por cada fila

    //cuadradito de color
    fill(layer.color); //color según la capa actual
    rect(legendX, y - boxSize / 2, boxSize, boxSize, 4); //dibuja un rectángulo en (legendX, y - boxSize/2) con tamaño boxSize x boxSize. y - boxSize/2 es para centrar el cuadrado verticalmente respecto de y. el último parámetro (4) es para redondear las esquinas.

    //texto
    fill(235);
    let txt = layer.name + "  (" + layer.thickness + " km aprox.)"; //nombre de la capa + grosor en km
    text(txt, legendX + boxSize + 10, y); //dibuja el texto a la derecha del cuadradito de color (legendX + boxSize + 10)
  }
}

//panel con datos numéricos
function drawNumbersPanel() {
  let panelX = width * 0.62; //X del panel (62% del ancho)
  let panelTop = 150 + marsLayers.length * 32 + 40; //Y del panel: empieza debajo de la leyenda (150 + altura de la leyenda + 40 px de espacio)

  textAlign(LEFT, TOP);

  fill(255);
  textSize(18);
  text("Datos de Marte", panelX, panelTop); //título del panel

  textSize(13);
  fill(210);
  let y = panelTop + 28; //posición Y inicial para el texto, un poco debajo del título

  text("Radio del planeta: 3.390 km", panelX, y);           y += 20; //dibuja el texto y luego suma 20 px a y para la siguiente línea
  text("Radio aproximado del núcleo: 1.830 km", panelX, y); y += 20;
  text("Espesor de la corteza: 24–72 km", panelX, y);       y += 28;

  text(
    "Ilustración esquemática, no a escala real.\n" +
    "Colores y grosores pensados para visualización didáctica.",
    panelX, //x
    y //y
  );
}




