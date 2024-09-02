import '../styles/App.css';
import React, { useState, useEffect, useRef } from 'react';
import FilterControls from '../components/FilterControls.js';
import IngredientList from '../components/IngredientList.js';
import Title from '../components/Title.js';
import Nav from "../components/Nav.js";
import RecipeDetails from '../components/RecipeDetails.js';
import DisplayResult from "../components/DisplayResult.js";



function App() {
    const [activePage, setPage] = useState("page1");
    const [filterType, setFilterType] = useState('protein');
    const [searchQuery, setSearchQuery] = useState('');
    const [recipeList, setRecipeList] = useState([]);
    const [cartIngredients, setCartIngredients] = useState(() => {
        return JSON.parse(localStorage.getItem('cartIngredients') || '[]');
    });

    function sortRecipes(recipes, filterType) {
        return [...recipes].sort((a, b) => {
            if (filterType === "calories") {
                return a.calories - b.calories;
            } else if (filterType === "ingredientCount") {
                return a.ingredientCount - b.ingredientCount;
            } else if (filterType === "protein%") {
                return b.proteinAmount - a.proteinAmount;
            }
            return 0;
        });
    }

    const prevRecipeList = useRef();

    useEffect(() => {
        localStorage.setItem('cartIngredients', JSON.stringify(cartIngredients));
    }, [cartIngredients]);

    useEffect(() => {
        if (activePage === "page2" && recipeList.length > 0 && JSON.stringify(recipeList) !== JSON.stringify(prevRecipeList.current)) {
            const sortedRecipes = sortRecipes(recipeList, filterType);
            setRecipeList(sortedRecipes);
        }
        prevRecipeList.current = recipeList;
    }, [filterType, activePage, recipeList]); // Include recipeList here
    

    useEffect(() => {
        if (recipeList.length > 0) {
            const sortedRecipes = sortRecipes([...recipeList], filterType);
            setRecipeList(sortedRecipes);
        }
    }, [filterType, recipeList]);
    
    useEffect(() => {
        if (activePage === "page1") {
            localStorage.removeItem('cartIngredients');
        }
    }, [activePage]);

    const handleFilterChange = (newFilterType) => {
        setFilterType(prev => newFilterType === prev ? '' : newFilterType);
    };

    function findRecipes() {
        const APP_ID = "f1c24774";
        const APP_KEY = "f9955a993e5303a0178dd05c733febc4";
        const ingredients = cartIngredients.join(',');
        const url = `https://api.edamam.com/search?q=${ingredients}&app_id=${APP_ID}&app_key=${APP_KEY}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const recipes = data.hits.map(hit => ({
                    label: hit.recipe.label,
                    image: hit.recipe.image,
                    url: hit.recipe.url,
                    ingredientCount: hit.recipe.ingredients.length,
                    proteinAmount: hit.recipe.totalNutrients.PROCNT ? Math.round(hit.recipe.totalNutrients.PROCNT.quantity) : 0,
                    calories: Math.round(hit.recipe.calories),
                }));
                setRecipeList(recipes);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                alert('Failed to fetch recipes. Please try again.');
            });
    }

    const changePage = () => {
        if (activePage === "page1") {
            if (cartIngredients.length === 0) {
                alert("No ingredients picked");
            } else {
                findRecipes();
                setPage("page2");
            }
        } else {
            clearCartAndReturnHome();
            setFilterType("protein")
            
        }
    };

    const clearCartAndReturnHome = () => {
        setCartIngredients([]);
        setRecipeList([]);
        setPage("page1");
        localStorage.removeItem('cartIngredients');
        console.log("Returning home and clearing cart ingredients");
    };

    return (
        <div className="App">
            <Nav
                buttonLabel={activePage === "page1" ? "Make Meal" : "Home"}
                onButtonClick={changePage}
            />
            <div className="filter-container">
                {activePage === "page1" ? (
                    <>
                        <Title />
                        <FilterControls
                            filters={[
                                { label: 'Protein', value: 'protein' },
                                { label: 'Vegetable', value: 'vegetable' },
                                { label: 'Grain', value: 'grain' }
                            ]}
                            onFilterChange={handleFilterChange}
                            onSearchChange={setSearchQuery}
                            enableSearch={true}
                        />
                        <IngredientList
                            filterType={filterType}
                            searchQuery={searchQuery}
                            cartIngredients={cartIngredients}
                            changeCart={setCartIngredients}
                        />
                    </>
                ) : (
                    <>
                        <DisplayResult cartIngredients={cartIngredients} recipeList={recipeList} />
                        <FilterControls
                            filters={[
                                { label: 'Calories', value: 'calories' },
                                { label: 'Ingredient count', value: 'ingredientCount' },
                                { label: 'Protein %', value: 'protein%' }
                            ]}
                            onFilterChange={handleFilterChange}
                            enableSearch={false}
                        />
                        <div className='container-ingredients'>
                        {recipeList.map((recipe, index) => (
                            <RecipeDetails key={index} recipe={recipe} />
                        ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;

