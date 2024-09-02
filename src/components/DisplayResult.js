import "../styles/displayInfo.css";

export default function DisplayResult({ cartIngredients, recipeList = []}) {
    return (
        <div className="result-container">
            <div className="result-info">
            <h3><span className="highlight">{recipeList.length}</span> Potential Meals <span className="highlight">Found!</span></h3>
                <span className="pickedItems">
                    {Array.isArray(cartIngredients) && cartIngredients.join(', ')}
                </span>
            </div>
        </div>
    );
}
