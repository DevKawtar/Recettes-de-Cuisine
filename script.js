const recipes = [ 
  { 
    id: 1, 
    name: "Salade César", 
    category: "végétarien", 
        description: "Une salade fraîche et savoureuse avec du poulet grillé, des croûtons et une sauce crémeuse.",
    url: "https://i.pinimg.com/1200x/04/44/31/044431c8343b5801ff75f4b493fd6a24.jpg" 
  },
  { 
    id: 2, 
    name: "Tarte au Chocolat", 
    category: "dessert", 
    description: "Un dessert irrésistible au chocolat fondant et à la pâte sablée croustillante.",
    url: "https://i.pinimg.com/1200x/4d/4d/bb/4d4dbb2e71f35479d9fc719023891fc7.jpg" 
  },
  { 
    id: 3, 
    name: "Ratatouille", 
    category: "végétarien", 
    description: "Un plat méditerranéen coloré, parfait pour accompagner vos repas d’été.",
    url: "https://i.pinimg.com/736x/9a/a2/0f/9aa20febc70522e076e3c1c45773222a.jpg" 
  }
];
// --- Sélecteurs principaux ---
const container = document.getElementById("recipes-container");
const categoryLinks = document.querySelectorAll("header a");

// --- Fonction d'affichage des recettes ---
function displayRecipes(recipesList) {
  container.innerHTML = "";
  container.classList.add("opacity-0", "transition-opacity", "duration-500");

  setTimeout(() => {
    recipesList.forEach(recipe => {
      const card = `
        <div class="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-transform transform hover:-translate-y-1 p-4">
          <img src="${recipe.url}" alt="${recipe.name}" class="w-full h-48 object-cover rounded-xl mb-4">
          <h3 class="text-xl font-semibold bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text text-transparent mb-1">${recipe.name}</h3>
          <p class="text-gray-600 text-sm mb-4">${recipe.description || ""}</p>
          <button 
            class="view-btn w-full py-2 bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white font-medium rounded-lg shadow-md transition"
            data-id="${recipe.id}"
          >
            Voir la recette
          </button>
        </div>
      `;
      container.insertAdjacentHTML("beforeend", card);
    });

    setTimeout(() => container.classList.remove("opacity-0"), 50);
    addButtonEvents(); // ajouter les events après affichage
  }, 200);
}

// --- Fonction pour gérer les boutons "Voir la recette" ---
function addButtonEvents() {
  const buttons = document.querySelectorAll(".view-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const recipeId = btn.getAttribute("data-id");
      window.location.href = `recipe.html?id=${recipeId}`;
    });
  });
}


// --- Afficher les détails dans une fenêtre modale ---
function showRecipeDetails(index) {
  const recipe = recipes[index];
  const modal = document.createElement("div");

  modal.className = "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50";
  modal.innerHTML = `
    <div class="bg-white rounded-2xl max-w-lg w-11/12 p-6 shadow-2xl relative">
      <button class="absolute top-3 right-3 text-gray-500 hover:text-pink-500 text-xl">&times;</button>
      <img src="${recipe.url}" alt="${recipe.name}" class="w-full h-56 object-cover rounded-xl mb-4">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">${recipe.name}</h2>
      <p class="text-gray-700 mb-4">${recipe.details}</p>
      <button class="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white font-medium px-5 py-2 rounded-lg">
        Fermer
      </button>
    </div>
  `;

  document.body.appendChild(modal);

  // Boutons pour fermer
  modal.querySelector("button").addEventListener("click", () => modal.remove());
  modal.querySelector(".absolute").addEventListener("click", () => modal.remove());
}

// --- Filtrage par catégorie ---
categoryLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault(); // empêche le rechargement
    const category = link.getAttribute("data-category");

    categoryLinks.forEach(l => l.classList.remove("text-yellow-600", "font-semibold"));
    link.classList.add("text-yellow-600", "font-semibold");

    if (category === "all") {
      displayRecipes(recipes);
    } else {
      const filtered = recipes.filter(r => r.category === category);
      displayRecipes(filtered);
    }
  });
});

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuBtn.textContent = mobileMenu.classList.contains("hidden") ? "☰" : "✖";
});

// --- Charger toutes les recettes au démarrage ---
displayRecipes(recipes);