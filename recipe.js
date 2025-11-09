const recipes = [
  {
    id: 1,
    name: "Salade César",
    description: "Une salade fraîche et savoureuse avec du poulet grillé, des croûtons et une sauce crémeuse.",
    category: "végétarien",
    url: "https://i.pinimg.com/1200x/04/44/31/044431c8343b5801ff75f4b493fd6a24.jpg",
    ingredients: [
      "2 poitrines de poulet grillées",
      "1 laitue romaine",
      "Croûtons dorés",
      "50g de parmesan râpé",
      "Sauce César maison"
    ],
    steps: [
      "Griller les poitrines de poulet jusqu’à ce qu’elles soient bien dorées.",
      "Laver et couper la laitue romaine.",
      "Mélanger la salade avec la sauce César.",
      "Ajouter le poulet tranché, les croûtons et le parmesan.",
      "Servir frais et déguster !"
    ]
  },
  {
    id: 2,
    name: "Tarte au Chocolat",
    description: "Un dessert irrésistible au chocolat fondant et à la pâte sablée croustillante.",
    category: "dessert",
    url: "https://i.pinimg.com/1200x/4d/4d/bb/4d4dbb2e71f35479d9fc719023891fc7.jpg",
    ingredients: [
      "1 pâte sablée",
      "200g de chocolat noir",
      "20cl de crème liquide",
      "2 œufs",
      "50g de sucre"
    ],
    steps: [
      "Faire fondre le chocolat avec la crème.",
      "Ajouter les œufs et le sucre, bien mélanger.",
      "Verser la préparation sur la pâte sablée.",
      "Cuire 20 minutes à 180°C.",
      "Laisser refroidir avant de servir."
    ]
  },
  {
    id: 3,
    name: "Ratatouille",
    description: "Un plat méditerranéen coloré, parfait pour accompagner vos repas d’été.",
    category: "végétarien",
    url: "https://i.pinimg.com/1200x/17/08/ae/1708ae6972f1577eb414382b5670a232.jpg",
    ingredients: [
      "1 aubergine",
      "1 courgette",
      "1 poivron rouge",
      "2 tomates",
      "1 oignon",
      "Huile d’olive, sel, poivre"
    ],
    steps: [
      "Couper tous les légumes en dés.",
      "Faire revenir l’oignon dans un peu d’huile d’olive.",
      "Ajouter les autres légumes et laisser mijoter 25 min.",
      "Assaisonner selon le goût.",
      "Servir chaud ou froid."
    ]
  },
  
];

// Récupération de l’ID depuis l’URL
const params = new URLSearchParams(window.location.search);
const recipeId = parseInt(params.get("id"));
const recipe = recipes.find(r => r.id === recipeId);

// Références DOM
const titleEl = document.getElementById("recipe-title");
const imageEl = document.getElementById("recipe-image");
const descEl = document.getElementById("recipe-description");
const ingredientsEl = document.getElementById("ingredients-list");
const stepsEl = document.getElementById("steps-list");

// Affichage
if (recipe) {
  titleEl.textContent = recipe.name;
  imageEl.src = recipe.url;
  descEl.textContent = recipe.description;

  ingredientsEl.innerHTML = recipe.ingredients
    .map(ing => `
      <li class="flex items-center">
        <input type="checkbox" class="mr-2 accent-pink-500 focus:ring-pink-400 cursor-pointer">
        <span>${ing}</span>
      </li>
    `).join("");

  stepsEl.innerHTML = recipe.steps.map(step => `<li>${step}</li>`).join("");
} else {
  titleEl.textContent = "Recette introuvable 😢";
}

// Fonction d’impression
function printRecipe() {
  window.print();
}
