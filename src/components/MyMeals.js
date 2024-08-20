import React, { useState, useEffect } from 'react';

const MyMeals = () => {
    const [pickedMeals, setPickedMeals] = useState([]);

    useEffect(() => {
        // Retrieve saved meals from local storage when the component mounts
        const savedMeals = localStorage.getItem('pickedMeals');
        if (savedMeals) {
            setPickedMeals(JSON.parse(savedMeals));
        }
    }, []); // Empty dependency array means this effect runs only once when the component mounts

    return (
        <div>
            <h3>My Saved Meals</h3>
            {pickedMeals.length === 0 ? (
                <p>No meals added yet.</p>
            ) : (
                <ul>
                    {pickedMeals.map((meal, index) => (
                        <li key={index}>
                            <h4>{meal.label}</h4>
                            <img src={meal.image} alt={meal.label} style={{ width: '100px' }} />
                            <p>Ingredients: {meal.ingredientList.join(', ')}</p>
                            <a href={meal.urltoRecipe} target="_blank" rel="noopener noreferrer">View Recipe</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyMeals;
