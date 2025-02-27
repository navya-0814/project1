document.getElementById('recipe-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;

    const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, ingredients, instructions }),
    });

    const newRecipe = await response.json();
    displayRecipe(newRecipe);

    document.getElementById('recipe-form').reset();
});

const fetchRecipes = async () => {
    const response = await fetch('http://localhost:5000/api/recipes');
    const recipes = await response.json();
    recipes.forEach(recipe => displayRecipe(recipe));
};

const displayRecipe = (recipe) => {
    const recipeList = document.getElementById('recipe-list');
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
        <h3>${recipe.title}</h3>
        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
    `;
    recipeList.appendChild(recipeDiv);
};

fetchRecipes();
