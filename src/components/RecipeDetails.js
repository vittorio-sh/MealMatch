import "../styles/recipe.css";

export default function RecipeDetails({ recipe }) {
    const { image, label, calories, ingredientCount, proteinAmount, url } = recipe;
    return (
        <div className="recipe-card">
            <img src={image} alt={label} className="recipe-image" />
            <div className="recipe-content">
                <h3 className="recipe-title">{label}</h3>
                <ul className="recipe-info-list">
                    <li className="recipe-info"><strong>Calories:</strong> {calories}</li>
                    <li className="recipe-info"><strong>Ingredient Count:</strong> {ingredientCount}</li>
                    <li className="recipe-info"><strong>Protein:</strong> {proteinAmount}g</li>
                    <li className="recipe-info"><strong>Recipe:</strong> <a href={url} target="_blank" rel="noopener noreferrer">View Recipe</a></li>
                </ul>
            </div>
        </div>
    );
}
