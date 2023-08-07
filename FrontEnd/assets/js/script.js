const images = [];
const titles = [];
const gallery = document.querySelector(".gallery");
const all = document.querySelector(".all");
const object = document.querySelector(".object");
const tenement = document.querySelector(".tenement");
const hotel = document.querySelector(".hotel");
const modal = document.querySelector(".modal");
let category1 = [];
localStorage.getItem("token");

//vérifier si l'utilisateur est connecté
if (localStorage.getItem("token")) {
  //si oui, afficher logout au lieu de login
  let login = document.querySelector(".login");
  login.textContent = "Logout";
  login.href = "index.html";
  //ajout d'un event listener sur le bouton logout
  login.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.reload();
  });
} else {
  //si non, cacher div edit
  let edit = document.querySelector(".edit");
  edit.style.display = "none";
}

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

async function fetchWorksModal() {
  let photos = document.querySelector(".photos");
  const response = await fetch("http://localhost:5678/api/works");
  const json = await response.json();
  Object.entries(json).forEach(([key, value]) => {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");
    img.src = value.imageUrl;
    img.alt = value.title;
    figcaption.textContent = "éditer";
    figure.appendChild(img);
    figure.appendChild(figcaption);
    photos.appendChild(figure);
  });
}

fetchWorksModal();

//ajout d'un event listener sur mode édition
document.querySelector(".edit p").addEventListener("click", () => {
  //afficher modal
  modal.classList.remove("hidden");
  modal.showModal();
});

modal.addEventListener("click", (e) => {
  const modalDimensions = modal.getBoundingClientRect();
  if (
    e.clientX < modalDimensions.left ||
    e.clientX > modalDimensions.right ||
    e.clientY < modalDimensions.top ||
    e.clientY > modalDimensions.bottom
  ) {
    modal.close();
  }
});

//ajout d'un event listener sur la croix de la modal
document.querySelector(".close").addEventListener("click", () => {
  modal.close();
});
