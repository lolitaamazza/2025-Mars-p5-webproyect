
let t = 0; //parámetro de tiempo para animar el noise (si t aumenta, el ruido cambia y parece que se mueve)
let W = 200; //declaro W como 200; es como tener una grilla de 200 columnas
let H = 200; //declaro H como 200; 200 filas
//en total tengo W * H puntos virtuales en la grilla
let lapse = 0;  //guarda el último momento (en milisegundos) en que hice un save() de la imagen. se usa para evitar guardar muchas imágenes si hacés muchos clics seguidos.
function setup() {
	createCanvas(1112, 834);
	colorMode(HSB, 255); //hue, saturation, brightness. los valores van de 0 a 255
	smooth(); //activa el suavizado/anti-aliasing en el renderizado de formas para que se vean menos pixeladas.
	noStroke();
}

function draw() {
	translate(0, 250); //desplaza el origen de dibujo 250 px hacia abajo; todas las coordenadas siguientes se ajustan por esto.
	background(0, 100, 180);
	for(let i = W * H; --i; ) { //let i = W * H; → i empieza en W * H (200 * 200 = 40000).--i en cada iteración se resta 1 a i antes de usarlo. entonces i va de 39999 a 0. cada valor de i representa una celda de la grilla 2D.
		let x = i % W; //calcula la columna x dentro de la grilla usando el resto de la división i por W. (entre 0 y 199).
		let z = parseInt(i / W); //divide i por W y toma solo la parte entera. esto da la fila (z) en la grilla (entre 0 y 199). lo llamo z porque después lo uso como si fuera “profundidad”.
		let y = noise(x / 30, z / 70 + t, 1); //x / 30 → hace que el noise cambie lentamente en el eje X. z / 70 + t → cambia en el eje Z + el tiempo t, a medida que t aumenta, el ruido “se desplaza”, lo que genera animación. 1 → tercer parámetro fijo, solo para cambiar un poco el patrón del ruido. basicamente "y" es una especie de “altura de montaña” entre 0 y 1, distinta para cada (x,z) y que se anima con el tiempo.
		z *= .01; //si z iba de 0 a 199, ahora va de 0 a 1.99. se usa para cálculos de perspectiva más adelante (divisiones por z).
		fill(0, 150, y * y * W); // 0 rojo,saturación 150 (medio alta), brillo: y * y → potencia el contraste: valores pequeños se vuelven aún más pequeños, valores grandes se agrandan un poco. * W (= 200) → escala el brillo a un rango más grande.
		let xPos = 500 + (x * 4 - W * 2) / z; //x * 4 escala la coordenada x para que haya más separación horizontal. W * 2, W es 200 → W * 2 = 400. x * 4 - W * 2 centra la grilla alrededor de 0. dividir por z genera el efecto de perspectiva: si z es pequeño (cerca de la cámara), la posición se aleja más del centro, como si estuviera “expandido”. si z es grande (más lejos), los puntos se apilan más cerca del centro. 500 + ... desplaza todo el resultado hacia la derecha 500 píxeles para centrarlo en el lienzo.
        let yPos = y * 175 / z; //y * 175 convierte el valor de ruido y (0 a 1) en una altura entre 0 y 175. / z,  dividir por z agrega perspectiva. antes ya hice translate(0, 250), así que las posiciones Y se suman a esos 250 px de desplazamiento hacia abajo.
        let wRect = Math.max(2, 40 - z * 10); //40 - z * 10, a medida que z aumenta, esto disminuye. rectángulos lejanos se ven más angostos (como en perspectiva). Math.max(2, ...) Math.max devuelve el valor más grande entre sus parámetros. esto garantiza que el ancho nunca sea menor a 2 píxeles.evita que el rectángulo desaparezca por ser demasiado finito.
        rect(xPos, yPos, wRect, 400); //dibuja un rectángulo: posición: (xPos, yPos). ancho: wRect. alto: 400 píxeles (siempre el mismo alto). esto da la sensación de columnas que salen desde abajo hacia arriba, con diferentes brillos y anchos.

}
t += deltaTime * .0005; //deltaTime es el tiempo (en milisegundos) desde el último frame. lo multiplico por 0.0005 para que t crezca de a poquito. de esta forma la animación es suave y dependiente del tiempo real, no solo del frame rate. como t se usa en el noise, esto hace que el ruido cambie en el tiempo y la escena esté animada.
	}

function mousePressed(){
//inicio de la función mousePressed(), llamada por p5.js cuando se hace clic. evita guardados repetidos.

  if (millis() - lapse > 400){ //millis() devuelve cuántos milisegundos pasaron desde que empezó el sketch. millis() - lapse calcula cuánto tiempo pasó desde la última vez que guarde una imagen. si pasaron más de 400 ms (0,4 segundos), deja guardar. esto evita que, si dejás el botón apretado o hacés muchos clics seguidos, se guarden cientos de archivos.
save('pix.jpg'); //guarda el contenido actual del canvas en un archivo llamado "pix.jpg".
    lapse = millis(); //actualiza lapse al tiempo actual para bloquear guardados inmediatos posteriores.
  }
}
/* resumen: cree un canvas grande y use HSB para los colores. simula una grilla 3D de 200 x 200 puntos.
para cada punto: calculo una “altura” con noise.
uso esa altura y la “profundidad” z para:
decidir el brillo, la posición X e Y con perspectiva,
el ancho del rectángulo (más finito cuanto más lejos).
dibujo columnas verticales que dan aspecto de un paisaje abstracto en 3D (tipo montañitas).
el parámetro t hace que el noise cambie con el tiempo → animación suave. */