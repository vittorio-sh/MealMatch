export const fetchRecipes = async (query) => {
    const APP_ID = 'f1c24774';
    const APP_KEY = 'f9955a993e5303a0178dd05c733febc4';
    
    const ingredientsString = query.join(',');

    const url = `https://api.edamam.com/search?q=${ingredientsString}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    let possibleMeals = [];

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        
        // Iterate over all hits and create possibleMeals objects
        possibleMeals = data.hits.map(hit => ({
            label: hit.recipe.label,
            ingredientList: hit.recipe.ingredientLines,
            image: hit.recipe.image,
            urltoRecipe: hit.recipe.url
        }));

        console.log(possibleMeals); // You can remove this line if you don't need to log it
        return possibleMeals; // Return the array of possible meals

    } catch (error) {
        console.error('There was an error fetching recipes:', error);
        return []; // Return an empty array in case of an error
    }
};
