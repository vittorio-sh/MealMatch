import React, { useState } from "react";
import { fetchRecipes } from '../features/api/mealfetch';
import RecipeList from '../components/RecipeList';

export default function MealForm() {
    const [ingredients, setIngredients] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState('proteins'); // State to track the active tab
    const [formData, setFormData] = useState({
        proteins: [],
        vegetables: [],
        grains: [],
        dairy: [],
        spices: [],
        canned: [],
        condiments: [],
        nuts: [],
        baking: [],
        beverages: [],
        miscellaneous: [],
    });

    function clearForm() {
        setFormData({
            proteins: [],
            vegetables: [],
            grains: [],
            dairy: [],
            spices: [],
            canned: [],
            condiments: [],
            nuts: [],
            baking: [],
            beverages: [],
            miscellaneous: [],
        });
        setIsSubmitted(false); // Optional: Reset the submission state as well
    };

    const handleCheckboxChange = (category, item) => {
        setFormData(prevState => {
            const updatedCategory = prevState[category].includes(item)
                ? prevState[category].filter(i => i !== item)
                : [...prevState[category], item];
            
            return {
                ...prevState,
                [category]: updatedCategory
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedIngredients = [
            ...formData.proteins,
            ...formData.vegetables,
            ...formData.grains,
            // Include other categories as well
        ];
        setIngredients(selectedIngredients);
        setIsSubmitted(true);
    };

    const renderSelectedItems = () => {
        const selectedItems = [
            ...formData.proteins,
            ...formData.vegetables,
            ...formData.grains,
            // Add other categories as needed
        ];

        return selectedItems.length > 0 ? (
            <div className="selected-items">
                <ul>
                    {selectedItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        ) : (
            <div className="selected-items">
                <h4>No items selected</h4>
            </div>
        );
    };

    return (
        <div id="mealFormContainer">
            <div className="nav-tabs">
                <button className={`tab-button ${activeTab === 'proteins' ? 'active' : ''}`} onClick={() => setActiveTab('proteins')}>Proteins</button>
                <button className={`tab-button ${activeTab === 'vegetables' ? 'active' : ''}`} onClick={() => setActiveTab('vegetables')}>Vegetables</button>
                <button className={`tab-button ${activeTab === 'grains' ? 'active' : ''}`} onClick={() => setActiveTab('grains')}>Grains</button>
            </div>
            <form id="foodForm" onSubmit={handleSubmit}>
            {activeTab === 'proteins' && (
            <div className="food-items">
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="chicken"
                        onChange={() => handleCheckboxChange('proteins', 'chicken')}
                    />
                    <div className="emoji">🍗</div>
                    <p className="food-label">Chicken</p>
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="beef"
                        onChange={() => handleCheckboxChange('proteins', 'beef')}
                    />
                    <div className="emoji">🥩</div>
                    <p className="food-label">Beef</p>
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="tofu"
                        onChange={() => handleCheckboxChange('proteins', 'tofu')}
                    />
                    <div className="emoji">🍤</div>
                    <p className="food-label">Tofu</p>
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="pork"
                        onChange={() => handleCheckboxChange('proteins', 'pork')}
                    />
                    <div className="emoji">🥓</div>
                    <p className="food-label">Pork</p>
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="lamb"
                        onChange={() => handleCheckboxChange('proteins', 'lamb')}
                    />
                    <div className="emoji">🍖</div>
                    <p className="food-label">Lamb</p>
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="turkey"
                        onChange={() => handleCheckboxChange('proteins', 'turkey')}
                    />
                    <div className="emoji">🦃</div>
                    <p className="food-label">Turkey</p>
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="salmon"
                        onChange={() => handleCheckboxChange('proteins', 'salmon')}
                    />
                    <div className="emoji">🐟</div>
                    <p className="food-label">Salmon</p>
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="shrimp"
                        onChange={() => handleCheckboxChange('proteins', 'shrimp')}
                    />
                    <div className="emoji">🦐</div>
                    <p className="food-label">Shrimp</p>
                </label>
            </div>
        )}
        {activeTab === 'vegetables' && (
            <div className="food-items">
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="carrots"
                        onChange={() => handleCheckboxChange('vegetables', 'carrots')}
                    />
                    <div className="emoji">🥕</div>
                    <p className="food-label">Carrots</p>
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="broccoli"
                        onChange={() => handleCheckboxChange('vegetables', 'broccoli')}
                    />
                    <div className="emoji">🥦</div>
                    <p className="food-label">Broccoli</p>
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="spinach"
                        onChange={() => handleCheckboxChange('vegetables', 'spinach')}
                    />
                    <div className="emoji">🌱</div>
                    <p className="food-label">Spinach</p>
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="tomato"
                        onChange={() => handleCheckboxChange('vegetables', 'tomato')}
                    />
                    <div className="emoji">🍅</div>
                    <p className="food-label">Tomato</p>
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="peppers"
                        onChange={() => handleCheckboxChange('vegetables', 'peppers')}
                    />
                    <div className="emoji">🫑</div>
                    <p className="food-label">Peppers</p>
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="corn"
                        onChange={() => handleCheckboxChange('vegetables', 'corn')}
                    />
                    <div className="emoji">🌽</div>
                    <p className="food-label">Corn</p>
                </label>
            </div>
        )}
        {activeTab === 'grains' && (
            <div className="food-items">
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="rice"
                        onChange={() => handleCheckboxChange('grains', 'rice')}
                    />
                    <div className="emoji">🍚</div>
                    <p className="food-label">Rice</p>
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="pasta"
                        onChange={() => handleCheckboxChange('grains', 'pasta')}
                    />
                    <div className="emoji">🍝</div>
                    <p className="food-label">Pasta</p>
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="quinoa"
                        onChange={() => handleCheckboxChange('grains', 'quinoa')}
                    />
                    <div className="emoji">🍲</div>
                    <p className="food-label">Quinoa</p>
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="bread"
                        onChange={() => handleCheckboxChange('grains', 'bread')}
                    />
                    <div className="emoji">🍞</div>
                    <p className="food-label">Bread</p>
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="oats"
                        onChange={() => handleCheckboxChange('grains', 'oats')}
                    />
                    <div className="emoji">🥣</div>
                    <p className="food-label">Oats</p>
                </label>
                <label>
                    <input
                        type="checkbox"
                        className="emoji-checkbox"
                        value="barley"
                        onChange={() => handleCheckboxChange('grains', 'barley')}
                    />
                    <div className="emoji">🌾</div>
                    <p className="food-label">Barley</p>
                </label>
            </div>
            )}
            {renderSelectedItems()}
            <button id="rrr" type="submit">Find Meals</button>
            <button id="rrr" onClick={clearForm}>Clear</button>
        </form>
        
        {isSubmitted && <RecipeList ingredients={ingredients} />}
    </div>
    );
}
