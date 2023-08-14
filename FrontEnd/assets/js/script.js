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
let typeClass = "all";

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
  login.textContent = "logout";
  login.href = "index.html";
  //afficher modifier au lieu de project-filter
  let projectFilter = document.querySelector(".project-filter");
  projectFilter.remove();
  let modifier = document.createElement("a");
  modifier.classList.add("modification");
  modifier.textContent = "Modifier";
  let portfolio = document.querySelector("#portfolio");
  portfolio.insertBefore(modifier, portfolio.childNodes[2]);
  //aficher avant modifier l'icone fontawesome pen to square
  let pen = document.createElement("i");
  pen.classList.add("fas", "fa-pen-square");
  portfolio.insertBefore(pen, portfolio.childNodes[2]);
  //ajout d'un lien avec texte modifier et icone fontawesome à la figure dans la section presentation
  let modifierIntro = document.createElement("a");
  modifierIntro.textContent = "Modifier";
  let i = document.createElement("i");
  i.classList.add("fas", "fa-pen-square");
  modifierIntro.appendChild(i);
  document.querySelector("#introduction figure").appendChild(modifierIntro);
  //ajout d'un event listener sur le bouton logout
  login.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.reload();
  });
  //appel de la fonction pour modifier un travail
  modificationUser();

  //si oui, montrer div edit
  let edit = document.querySelector(".edit");
  edit.style.display = "flex";
}

object.addEventListener("click", () => {
  displayCategory(1);
  //colorer la catégorie sélectionnée
  highlightCategory(object);
});

tenement.addEventListener("click", () => {
  displayCategory(2);
  highlightCategory(tenement);
});

hotel.addEventListener("click", () => {
  displayCategory(3);
  highlightCategory(hotel);
});

all.addEventListener("click", () => {
  displayCategory();
  highlightCategory(all);
});

async function highlightCategory(type) {
  type.style.backgroundColor = "#1D6154";
  type.style.color = "white";
  if (typeClass !== type.classList[1]) {
    document.querySelector(`.${typeClass}`).style.backgroundColor = "white";
    document.querySelector(`.${typeClass}`).style.color = "#1D6154";
  }
  //mémoriser la classe du type sélectionné
  typeClass = type.classList[1];
}

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
// englober les 2 addEventListener dans une fonction
async function modificationUser() {
  //ajout d'un event listener sur icone fontawesome pen to square
  document.querySelector(".fa-pen-square").addEventListener("click", () => {
    //afficher modal
    modal.showModal();
    modal.style.display = "flex";
    deleteWork();
  });

  //ajout d'un event listener sur modifier
  document.querySelector(".modification").addEventListener("click", () => {
    //afficher modal
    modal.showModal();
    modal.style.display = "flex";
    deleteWork();
  });
}

// fonction pour supprimer un travail
async function deleteWork() {
  document.querySelectorAll(".fa-trash-alt").forEach((trash) => {
    trash.addEventListener("click", async () => {
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
  addEventListenerToLoading();
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

function addEventListenerToLoading() {
  document.getElementById("image").addEventListener("change", (e) => {
    //afficher image à la place de l'icone fontawesome, du label et du texte
    document.querySelector(".fa-image").style.display = "none";
    document.querySelector(".photo-to-add input").style.display = "none";
    document.querySelector(".requirement").style.display = "none";
    document.querySelector(".form-info--label").style.color = "#E8F1F6";
    document.querySelector(".form-info--label").style.backgroundColor =
      "#E8F1F6";
    //afficher l'image choisie
    let img = document.createElement("img");
    img.src = URL.createObjectURL(e.target.files[0]);
    img.alt = "image";
    let formLabel = document.querySelector(".form-info--label");
    formLabel.insertBefore(img, formLabel.childNodes[1]);
    //ajouter classe
    img.classList.add("chosen-image");
  });
}
