import React, { useState, useEffect } from 'react';
import { fetchRecipes } from '../features/api/mealfetch';

const RecipeList = ({ ingredients }) => {
    const [possibleMeals, setPossibleMeals] = useState([]);
    const [error, setError] = useState(null);
    const [pickedMeals, setPickedMeals] = useState(() => {
        const savedMeals = localStorage.getItem('pickedMeals');
        return savedMeals ? JSON.parse(savedMeals) : [];
    });

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const meals = await fetchRecipes(ingredients);
                setPossibleMeals(meals);
            } catch (err) {
                setError(err.message);
            }
        };

        if (ingredients.length > 0) {
            getRecipes();
        }
    }, [ingredients]);

    const handleAddMeal = (meal) => {
        const updatedPickedMeals = [...pickedMeals, meal];
        setPickedMeals(updatedPickedMeals);
        localStorage.setItem('pickedMeals', JSON.stringify(updatedPickedMeals));
        alert("added meal!")
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h3>Possible Meals</h3>
            <ul>
                {possibleMeals.map((meal, index) => (
                    <li key={index}>
                        <h4>{meal.label}</h4>
                        <img src={meal.image} alt={meal.label} style={{ width: '100px' }} />
                        <p>Ingredients: {meal.ingredientList.join(', ')}</p>
                        <a href={meal.urltoRecipe} target="_blank" rel="noopener noreferrer">View Recipe</a>
                        <button onClick={() => handleAddMeal(meal)}>Add</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
