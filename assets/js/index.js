//SKETCHES GALLERY GRID
if (document.getElementById("galleryGrid")) {
    let galleryGrid = document.getElementById("galleryGrid");

    //array de sketches
    let sketches = [
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
            href: "assets/sketches/clicker",
            imgSrc: "assets/imgs/clicker.jpeg",
            imgAlt: "Mars clicker — p5.js sketch",
            title: "Mars clicker",
            pillText: "Open sketch"
        }
    ];

    //crear las cards una por una
    for (let i = 0; i < sketches.length; i++) {
        let data = sketches[i];
        // <a class="card">
        let link = document.createElement("a");
        link.className = "card";
        link.href = data.href;
        link.target = "_blank";

        //<figure>
        let figure = document.createElement("figure");
        figure.className = "card-figure";

        //imagen
        let img = document.createElement("img");
        img.src = data.imgSrc;
        img.alt = data.imgAlt;

        //caption
        let figcaption = document.createElement("figcaption");
        figcaption.className = "card-caption";

        //título
        let captionLeft = document.createElement("div");
        captionLeft.className = "caption-left";

        let h3 = document.createElement("h3");
        h3.textContent = data.title;

        captionLeft.appendChild(h3);

        //pill
        let pill = document.createElement("span");
        pill.className = "pill";
        pill.textContent = data.pillText;

        //armar caption
        figcaption.appendChild(captionLeft);
        figcaption.appendChild(pill);

        //armar figure
        figure.appendChild(img);
        figure.appendChild(figcaption);

        //meter todo en <a>
        link.appendChild(figure);

        //agregar al grid
        galleryGrid.appendChild(link);
    }
}

document.addEventListener("DOMContentLoaded", function () {

  let factsSection = document.getElementById("facts");
  if (factsSection) {

    //CONTENEDOR PRINCIPAL
    let container = document.createElement("div");
    container.className = "container";
    factsSection.appendChild(container);

    //título + subtítulo
    let header = document.createElement("header");
    header.className = "section-head";

    let title = document.createElement("h2");
    title.className = "section-title";
    title.textContent = "About Mars";

    let kicker = document.createElement("p");
    kicker.className = "section-kicker";
    kicker.textContent = "Key facts you didn't know.";

    header.appendChild(title);
    header.appendChild(kicker);
    container.appendChild(header);

    //facts-grid
    let factsGrid = document.createElement("div");
    factsGrid.className = "facts-grid";
    factsGrid.setAttribute("role", "list");
    container.appendChild(factsGrid);

    //array con todos los facts
    let facts = [
      { title: "Distance from the Sun", value: "1.524 AU", valueSpan: "≈ 227.9 million km", note: "Average orbital distance." },
      { title: "Diameter", value: "6,779 km", note: "Mean diameter at the equator." },
      { title: "Surface Gravity", value: "3.71 m/s²", valueSpan: "≈ 0.38 g", note: "About 38% of Earth’s gravity." },
      { title: "Length of a Day", value: "1 sol ≈ 24 h 39 m", note: "Solar day (noon-to-noon)." },
      { title: "Length of a Year", value: "687 Earth days", note: "≈ 668.6 sols." },
      { title: "Atmosphere", value: "~95% CO₂, 2.7% N₂, 1.6% Ar", note: "Traces of O₂ and H₂O; very thin (~6 mbar)." },
      { title: "Average Surface Temp.", value: "−63 °C", valueSpan: "−81 °F", note: "Varies widely by season & latitude." },
      { title: "Moons", value: "Phobos & Deimos", note: "Captured asteroid–like bodies." },
      { title: "Tallest Volcano", value: "Olympus Mons — 21.9 km", note: "Shield volcano, ~2.5× Everest." },
      { title: "Grand Canyon", value: "Valles Marineris — ~4,000 km", note: "Up to ~7 km deep, 200 km wide." }
    ];

    //fact-cards
    for (let i = 0; i < facts.length; i++) {
      let fact = facts[i];

      let article = document.createElement("article");
      article.className = "fact-card";
      article.setAttribute("role", "listitem");

      //título
      let h3 = document.createElement("h3");
      h3.textContent = fact.title;
      article.appendChild(h3);

      //valor principal
      let pValue = document.createElement("p");
      pValue.className = "value";
      pValue.textContent = fact.value;

      //span opcional entre paréntesis
      if (fact.valueSpan) {
        let span = document.createElement("span");
        span.textContent = " (" + fact.valueSpan + ")";
        pValue.appendChild(span);
      }

      article.appendChild(pValue);

      //nota
      let pNote = document.createElement("p");
      pNote.className = "note";
      pNote.textContent = fact.note;
      article.appendChild(pNote);

      //meto la card al grid
      factsGrid.appendChild(article);
    }
  }

});
