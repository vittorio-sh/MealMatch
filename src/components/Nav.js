import React from 'react';
import "../styles/nav.css";

export default function Nav({ cartCount, buttonLabel, onButtonClick }) {
    return (
        <div className="nav-container">
            <div className="logo">
                <h1>Meal Matcher</h1>
            </div>
            <div className="cart-icon">
                <button onClick={onButtonClick} className='add-icon'>{buttonLabel}</button>
                {cartCount ? <p className='nostyle'>{cartCount}</p> : <p className='nostylee'>+</p>}
            </div>
        </div>
    );
}
