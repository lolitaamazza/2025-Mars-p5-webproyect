document.addEventListener('DOMContentLoaded', () => {

      const sketches = [
        {
          href: "assets/sketches/2025-galaxia-p5",
          imgSrc: "assets/gifs/polar-auroras-preview.gif",
          imgAlt: "Polar Auroras — p5.js sketch",
          title: "Polar Auroras",
          pillText: "Open sketch"
        },
        {
          href: "assets/tps/lucho/index.html",
          imgSrc: "https://placehold.co/600x400/130f0d/e7ddc9?text=Sketch+2",
          imgAlt: "Phobos orbit lines — p5.js sketch",
          title: "Phobos Orbits",
          pillText: "Open sketch"
        },
        {
          href: "assets/sketches/2025-marte-p5-para-pagina",
          imgSrc: "https://placehold.co/600x400/130f0d/e7ddc9?text=Sketch+3",
          imgAlt: "Perlin dunes on Mars — p5.js sketch",
          title: "Perlin Dunes",
          pillText: "Open sketch"
        },
        {
          href: "#",
          imgSrc: "https://placehold.co/600x400/130f0d/e7ddc9?text=Sketch+4",
          imgAlt: "Otro sketch de ejemplo",
          title: "Mi Nuevo Sketch",
          pillText: "Ver más"
        }
      ];

     //selecciono el contenedor donde irán las tarjetas
      const galleryGrid = document.getElementById('galleryGrid');
      
      if (galleryGrid) {
        //uso .map() para transformar cada objeto en un string HTML
        const cardElements = sketches.map(sketch => {

          //genero el contenido del caption (solo título)
          const captionContent = `<div class="caption-left"><h3>${sketch.title}</h3></div>`;

          //return la plantilla HTML completa para la tarjeta
          return `
            <a class="card" href="${sketch.href}" target="_blank" rel="noopener">
              <figure class="card-figure">
                <img src="${sketch.imgSrc}" alt="${sketch.imgAlt}" loading="lazy" decoding="async">
                <figcaption class="card-caption">
                  ${captionContent}
                  <span class="pill">${sketch.pillText}</span>
                </figcaption>
              </figure>
            </a>
          `;
        }).join(''); //uno todos los strings HTML en uno solo

        //inserto todo el HTML generado en el DOM de una sola vez
        galleryGrid.innerHTML = cardElements;
      }

    });





/* otra versión más clásica sin usar .map() ni template strings
var sketches = [
  {
    title: "Dust Storm Crater",
    href: "assets/sketches/2025-galaxia-p5",
    img: "assets/imgs/sketch1.jpeg",
    alt: "Dust storm over crater — p5.js sketch",
    badge: "Open sketch"
  },
  {
    title: "Phobos Orbits",
    href: "assets/tps/lucho/index.html",
    img: "assets/imgs/sketch1.jpeg",
    alt: "Phobos orbit lines — p5.js sketch",
    badge: "Open sketch"
  },
  {
    title: "Perlin Dunes",
    href: "assets/sketches/2025-marte-p5-para-pagina",
    img: "assets/imgs/sketch1.jpeg",
    alt: "Perlin dunes on Mars — p5.js sketch",
    badge: "Open sketch"
  },
  {
    title: "Polar Auroras",
    href: "assets/sketches/mars-polar-auroras-p5",
    img: "assets/gifs/polar-auroras-preview.gif",
    alt: "Polar auroras simulated on Mars — animated preview",
    badge: "Open sketch",
    byline: "p5.js sketch"
  }
  // podés seguir agregando...
];

// 2) cuando el DOM está listo
document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("galleryGrid");
  if (!grid) {
    return;
  }

  // 3) recorrer el array y crear las cards
  for (var i = 0; i < sketches.length; i++) {
    var item = sketches[i];

    // <a class="card" ...>
    var link = document.createElement("a");
    link.className = "card";
    link.href = item.href;
    link.target = "_blank";
    link.rel = "noopener";

    // <figure class="card-figure">
    var figure = document.createElement("figure");
    figure.className = "card-figure";

    // <img ...>
    var img = document.createElement("img");
    img.src = item.img;
    img.alt = item.alt;
    img.loading = "lazy";
    img.decoding = "async";

    // <figcaption ...>
    var caption = document.createElement("figcaption");
    caption.className = "card-caption";

    // contenedor izq por si hay byline
    var captionLeft = document.createElement("div");
    captionLeft.className = "caption-left";

    // <h3>...</h3>
    var h3 = document.createElement("h3");
    h3.textContent = item.title;
    captionLeft.appendChild(h3);

    // si el objeto tiene byline, lo agregamos
    if (item.byline) {
      var by = document.createElement("span");
      by.className = "byline";
      by.textContent = item.byline;
      captionLeft.appendChild(by);
    }

    // <span class="pill">Open sketch</span>
    var pill = document.createElement("span");
    pill.className = "pill";
    // si el objeto trae otro texto lo usamos, si no ponemos uno por defecto
    if (item.badge) {
      pill.textContent = item.badge;
    } else {
      pill.textContent = "Open sketch";
    }

    // armar figcaption
    caption.appendChild(captionLeft);
    caption.appendChild(pill);

    // armar figure
    figure.appendChild(img);
    figure.appendChild(caption);

    // meter figure dentro del <a>
    link.appendChild(figure);

    // y por último lo metemos al grid
    grid.appendChild(link);
  }
});
*/
