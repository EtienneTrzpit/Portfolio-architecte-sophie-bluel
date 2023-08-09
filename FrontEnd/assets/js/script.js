const images = [];
const titles = [];
const gallery = document.querySelector(".gallery");
const all = document.querySelector(".all");
const object = document.querySelector(".object");
const tenement = document.querySelector(".tenement");
const hotel = document.querySelector(".hotel");
const modal = document.querySelector(".modal");
const modalAdd = document.querySelector(".modal-add");
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
    let trash = document.createElement("i");
    trash.classList.add("fas", "fa-trash-alt");
    trash.id = value.id;
    img.src = value.imageUrl;
    img.alt = value.title;
    figcaption.textContent = "éditer";
    figure.appendChild(trash);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    photos.appendChild(figure);
  });
}

fetchWorksModal();

//ajout d'un event listener sur mode édition
document.querySelector(".edit p").addEventListener("click", () => {
  //afficher modal
  modal.showModal();
  modal.style.display = "flex";
  deleteWork();
});

// fonction pour supprimer un travail
async function deleteWork() {
  document.querySelectorAll(".fa-trash-alt").forEach((trash) => {
    trash.addEventListener("click", async () => {
      console.log("trash");
      // créer message de confirmation
      let confirmation = confirm("Voulez-vous vraiment supprimer ce travail ?");
      // si oui, supprimer le travail
      if (confirmation) {
        const response = await fetch(
          `http://localhost:5678/api/works/${trash.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        // supprimer le travail dans le DOM
        trash.parentNode.remove();
      }
    });
  });
}

modal.addEventListener("click", (e) => {
  const modalDimensions = modal.getBoundingClientRect();
  if (
    e.clientX < modalDimensions.left ||
    e.clientX > modalDimensions.right ||
    e.clientY < modalDimensions.top ||
    e.clientY > modalDimensions.bottom
  ) {
    modal.close();
    modal.style.display = "none";
  }
});

//ajout d'un event listener sur la croix de la modal
document.querySelector(".close").addEventListener("click", () => {
  modal.close();
  modal.style.display = "none";
});

//ajout d'un event listener sur le bouton ajouter
document.querySelector(".add").addEventListener("click", async () => {
  //cacher modal
  modal.close();
  modal.style.display = "none";
  //afficher modal add
  document.querySelector(".modal-add").showModal();
  modalAdd.style.display = "flex";
});

//ajout d'un event listener sur la croix de la modal add
document.querySelector(".close-add").addEventListener("click", () => {
  document.querySelector(".modal-add").close();
});

//ajout d'un event listener en dehors de la modal add
document.querySelector(".modal-add").addEventListener("click", (e) => {
  const modalDimensions = document
    .querySelector(".modal-add")
    .getBoundingClientRect();
  if (
    e.clientX < modalDimensions.left ||
    e.clientX > modalDimensions.right ||
    e.clientY < modalDimensions.top ||
    e.clientY > modalDimensions.bottom
  ) {
    document.querySelector(".modal-add").close();
  }
});
