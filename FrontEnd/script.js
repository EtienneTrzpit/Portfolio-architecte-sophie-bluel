const images = [];
const titles = [];
const gallery = document.querySelector(".gallery");
const all = document.querySelector(".all");
const object = document.querySelector(".object");
const tenement = document.querySelector(".tenement");
const hotel = document.querySelector(".hotel");
let category1 = [];

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

async function displayCategory1() {
  let gallery = document.querySelector(".gallery");
  gallery.remove();
  let newGallery = document.createElement("div");
  newGallery.classList.add("gallery");
  document.querySelector("#portfolio").appendChild(newGallery);
  const response = await fetch("http://localhost:5678/api/works");
  const json = await response.json();
  Object.entries(json).forEach(([key, value]) => {
    if (value.categoryId === 1) {
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let figcaption = document.createElement("figcaption");
      img.src = value.imageUrl;
      img.alt = value.title;
      figcaption.textContent = value.title;
      figure.appendChild(img);
      figure.appendChild(figcaption);
      newGallery.appendChild(figure);
    }
  });
}

async function displayCategory2() {
  let gallery = document.querySelector(".gallery");
  gallery.remove();
  let newGallery = document.createElement("div");
  newGallery.classList.add("gallery");
  document.querySelector("#portfolio").appendChild(newGallery);
  const response = await fetch("http://localhost:5678/api/works");
  const json = await response.json();
  Object.entries(json).forEach(([key, value]) => {
    if (value.categoryId === 2) {
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let figcaption = document.createElement("figcaption");
      img.src = value.imageUrl;
      img.alt = value.title;
      figcaption.textContent = value.title;
      figure.appendChild(img);
      figure.appendChild(figcaption);
      newGallery.appendChild(figure);
    }
  });
}

async function displayCategory3() {
  let gallery = document.querySelector(".gallery");
  gallery.remove();
  let newGallery = document.createElement("div");
  newGallery.classList.add("gallery");
  document.querySelector("#portfolio").appendChild(newGallery);
  const response = await fetch("http://localhost:5678/api/works");
  const json = await response.json();
  Object.entries(json).forEach(([key, value]) => {
    if (value.categoryId === 3) {
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let figcaption = document.createElement("figcaption");
      img.src = value.imageUrl;
      img.alt = value.title;
      figcaption.textContent = value.title;
      figure.appendChild(img);
      figure.appendChild(figcaption);
      newGallery.appendChild(figure);
    }
  });
}

async function displayAll() {
  let gallery = document.querySelector(".gallery");
  gallery.remove();
  let newGallery = document.createElement("div");
  newGallery.classList.add("gallery");
  document.querySelector("#portfolio").appendChild(newGallery);
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
    newGallery.appendChild(figure);
  });
}

object.addEventListener("click", displayCategory1);
tenement.addEventListener("click", displayCategory2);
hotel.addEventListener("click", displayCategory3);
all.addEventListener("click", displayAll);
