import React, { useState, useEffect } from 'react';
import Ingredient from './Ingredient';
import foodData from '../features/api/foodData';
import "../styles/cardList.css";

export default function IngredientList({ filterType, searchQuery, changeCart, cartIngredients }) {
    const [displayedItems, changeItems] = useState(
        foodData.filter((item) => item.type === 'protein') 
    );

    useEffect(() => {
        let filteredData = filterType === 'all' ? foodData : foodData.filter((item) => item.type === filterType);

        if (searchQuery) {
            filteredData = filteredData.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        changeItems(filteredData);
    }, [filterType, searchQuery]);


    return (
        <div className="ingredientsList">
            {displayedItems.map(({ image, title, kcal }, index) => (
                <Ingredient 
                    key={index}
                    image={image}
                    title={title}
                    kcal={kcal}
                    changeCart={changeCart} // Pass changeCart correctly
                    cartIngredients={cartIngredients} // Pass cartIngredients to Ingredient
                />
            ))}
        </div>
    );
}
