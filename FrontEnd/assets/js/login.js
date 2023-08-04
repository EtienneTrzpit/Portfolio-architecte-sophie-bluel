const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  // envoyer contenu formulaire au serveur
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    // récupérer la réponse du serveur
    .then((response) => response.json())
    // faire quelque chose avec la réponse
    .then((response) => {
      console.log(response);
      // si le serveur renvoie une erreur
      if (response.error) {
        // afficher l'erreur
        alert("E-mail ou mot de passe incorrect");
        // arrêter l'exécution de la fonction
        return;
      }
      // récupérer le token
      const token = response.token;
      // stocker le token dans le local storage
      localStorage.setItem("token", token);
      // rediriger vers la page d'accueil
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
