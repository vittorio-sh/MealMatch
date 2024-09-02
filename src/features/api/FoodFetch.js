


export default function FoodFetch({ingredients}) {{
    const APP_ID = f1c24774;
    const APP_KEY = f9955a993e5303a0178dd05c733febc4;
    const url = "https://api.edamam.com/search?q=${ingredients}&app_id=${APP_ID}&app_key=${APP_KEY}";
    
    
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))

    return (
        {data}
    )
}}

