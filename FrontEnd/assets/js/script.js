const formImg = document.querySelector(".form-image");
const all = document.querySelector(".all");
const object = document.querySelector(".object");
const tenement = document.querySelector(".tenement");
const hotel = document.querySelector(".hotel");
const modal = document.querySelector(".modal");
const modalAdd = document.querySelector(".modal-add");
localStorage.getItem("token");
let idWorks = [];
let titleWorks = [];
let imageUrlWorks = [];
let categoryWorks = [];
let numberofWorks = 0;

//fonction pour trouver id d'une categorie
function findIdCategory(category) {
  let idCategory = 0;
  switch (category) {
    case "object":
      idCategory = 1;
      break;
    case "tenement":
      idCategory = 2;
      break;
    case "hotel":
      idCategory = 3;
      break;
  }
  return idCategory;
}

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

object.addEventListener("click", () => {
  displayCategory(1);
});

tenement.addEventListener("click", () => {
  displayCategory(2);
});

hotel.addEventListener("click", () => {
  displayCategory(3);
});

all.addEventListener("click", () => {
  displayCategory();
});

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

//ajout d'un event listener sur le bouton ajouter
document.querySelector(".add").addEventListener("click", async () => {
  //cacher modal
  modal.close();
  modal.style.display = "none";
  //afficher modal add
  document.querySelector(".modal-add").showModal();
  modalAdd.style.display = "flex";
});

//ajout d'un event listener sur la croix de la modal
document.querySelector(".close1").addEventListener("click", () => {
  document.querySelector(".modal").close();
  modal.style.display = "none";
});

//ajout d'un event listener sur la croix de la modal add
document.querySelector(".close2").addEventListener("click", () => {
  document.querySelector(".modal-add").close();
});

//ajout d'un event listener sur la flèche de la modal add
document.querySelector(".back").addEventListener("click", () => {
  document.querySelector(".modal-add").close();
  modalAdd.style.display = "none";
  modal.showModal();
  modal.style.display = "flex";
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
    modalAdd.style.display = "none";
  }
});

formImg.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = document.querySelector("#image").files[0];
  const formData = new FormData();
  let imageUrl = file;
  formData.append("image", file);
  let title = document.querySelector("#title").value;
  formData.append("title", title);
  let category = document.querySelector("#category").value;
  let categoryId = findIdCategory(category);
  formData.append("category", categoryId);
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });
  const json = await response.json();
  document.querySelector(".modal-add").close();
  modalAdd.style.display = "none";
  window.location.reload();
});

//fonction pour récupérer les travaux de l'utilisateur et stockage des données par des variables
async function fetchWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const json = await response.json();
  Object.entries(json).forEach(([key, value]) => {
    //création d'une variable pour stocker les id des travaux
    idWorks.push(value.id);
    //création d'une variable pour stocker les titres des travaux
    titleWorks.push(value.title);
    //création d'une variable pour stocker les url des travaux
    imageUrlWorks.push(value.imageUrl);
    //création d'une variable pour stocker les catégories des travaux
    categoryWorks.push(value.categoryId);
    numberofWorks++;
  });
}

//fonction pour afficher les travaux avec comme paramètre la ou les catégories à afficher

async function displayCategory(...category) {
  // suppresion de la gallerie
  document.querySelector(".gallery").remove();
  // création d'une nouvelle gallerie
  let newGallery = document.createElement("div");
  newGallery.classList.add("gallery");
  document.querySelector("#portfolio").appendChild(newGallery);
  // boucle pour afficher les travaux
  for (let i = 0; i < numberofWorks; i++) {
    // afficher tous les travaux si aucun paramètre n'est passé
    if (category.length === 0) {
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let figcaption = document.createElement("figcaption");
      img.src = imageUrlWorks[i];
      img.alt = titleWorks[i];
      figcaption.textContent = titleWorks[i];
      figure.appendChild(img);
      figure.appendChild(figcaption);
      newGallery.appendChild(figure);
    } else {
      // afficher les travaux selon la ou les catégories passées en paramètre
      for (let j = 0; j < category.length; j++) {
        if (categoryWorks[i] === category[j]) {
          let figure = document.createElement("figure");
          let img = document.createElement("img");
          let figcaption = document.createElement("figcaption");
          img.src = imageUrlWorks[i];
          img.alt = titleWorks[i];
          figcaption.textContent = titleWorks[i];
          figure.appendChild(img);
          figure.appendChild(figcaption);
          newGallery.appendChild(figure);
        }
      }
    }
  }
  changePhotosModal(...category);
}

//appel de la fonction pour afficher tous les travaux
fetchWorks().then(() => displayCategory());

//fonction pour changer photos du modal en fonction de ce qu'affiche la gallerie
function changePhotosModal(...category) {
  //suppression des photos du modal
  document.querySelector(".photos").remove();
  //création d'une nouvelle div pour les photos du modal
  let newPhotos = document.createElement("div");
  newPhotos.classList.add("photos");
  // insert before hr
  document
    .querySelector(".modal")
    .insertBefore(newPhotos, document.querySelector("hr"));
  // boucle pour afficher les photos du modal
  for (let i = 0; i < numberofWorks; i++) {
    // afficher tous les travaux si aucun paramètre n'est passé
    if (category.length === 0) {
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let figcaption = document.createElement("figcaption");
      let trash = document.createElement("i");
      trash.classList.add("fas", "fa-trash-alt");
      trash.id = idWorks[i];
      img.src = imageUrlWorks[i];
      img.alt = titleWorks[i];
      figcaption.textContent = "éditer";
      figure.appendChild(trash);
      figure.appendChild(img);
      figure.appendChild(figcaption);
      newPhotos.appendChild(figure);
    } else {
      // afficher les travaux selon la ou les catégories passées en paramètre
      for (let j = 0; j < category.length; j++) {
        if (categoryWorks[i] === category[j]) {
          let figure = document.createElement("figure");
          let img = document.createElement("img");
          let figcaption = document.createElement("figcaption");
          let trash = document.createElement("i");
          trash.classList.add("fas", "fa-trash-alt");
          trash.id = idWorks[i];
          img.src = imageUrlWorks[i];
          img.alt = titleWorks[i];
          figcaption.textContent = "éditer";
          figure.appendChild(trash);
          figure.appendChild(img);
          figure.appendChild(figcaption);
          newPhotos.appendChild(figure);
        }
      }
    }
  }
  deleteWork();
}
