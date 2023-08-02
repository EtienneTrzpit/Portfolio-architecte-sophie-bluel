const images = [];
const titles = [];
const gallery = document.querySelector(".gallery");

async function fetchWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const json = await response.json();
  Object.entries(json).forEach(([key, value]) => {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");
    img.src = value.imageUrl;
    img.alt = value.title;
    figcaption.textContent = value.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

fetchWorks();
