import React, { useState, useEffect } from 'react';
import "../styles/card.css";

export default function Ingredient({ image, title, kcal, changeCart, cartIngredients }) {
    const [isAdded, setIsAdded] = useState(() => cartIngredients && cartIngredients.includes(title));

    const handleButtonClick = () => {
        setIsAdded((prevState) => {
            if (prevState) {
                // Remove item from cart
                changeCart((prev) => prev.filter(item => item !== title));
            } else {
                // Add item to cart
                changeCart((prev) => [...prev, title]);
            }
            return !prevState;
        });
    };

    useEffect(() => {
        if (cartIngredients) {
            setIsAdded(cartIngredients.includes(title));
        }
    }, [cartIngredients, title]);

    return (
        <div onClick={handleButtonClick} className={`card-ingredient ${isAdded ? 'added-to-cart' : ''}`}>
            <div className="image-container">
                <img className='img-ingredient' src={image} alt={title} />
            </div>
            <div className="title">
                <h2>{title}</h2>
                <p>Per 100g</p>
            </div>
            <div className="kcal-add">
                <span className="kcal">{kcal} kcal</span>
                <button className="add-button">
                    {isAdded ? '-' : '+'}
                </button>
            </div>
        </div>
    );
}
