document.addEventListener('DOMContentLoaded', () => {

      const sketches = [
        {
          href: "assets/sketches/mars-polar-auroras-p5",
          imgSrc: "assets/gifs/polargif.gif",
          imgAlt: "Polar Auroras — p5.js sketch",
          title: "Polar Auroras",
          pillText: "Open sketch"
        },
        {
          href: "assets/sketches/mars-textura",
          imgSrc: "assets/gifs/mars-texture.gif",
          imgAlt: "Mars texture — p5.js sketch",
          title: "Mars texture",
          pillText: "Open sketch"
        },
        {
          href: "assets/sketches/2025-mars-layers",
          imgSrc: "assets/imgs/mars-layers.jpeg",
          imgAlt: "Mars layers — p5.js sketch",
          title: "Mars layers",
          pillText: "Open sketch"
        },
        {
          href: "#",
          imgSrc: "assets/imgs/clicker.jpeg",
          imgAlt: "Mars clicker — p5.js sketch",
          title: "Mars clicker",
          pillText: "Open sketch"
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
