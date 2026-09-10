export default function RecipeDetail({ recipe, onBack }) {
    return (
        <div className="card">
            <h1>{recipe.strMeal}</h1>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />

            <h3>Category</h3>
            <p>{recipe.strCategory}</p>

            <h3>Instructions</h3>
            <p>{recipe.strInstructions}</p>

            <h3>Ingredients</h3>
            <ul>
                {Object.keys(recipe) //looks at the keys in the recipe obj.
                .filter((key) => key.startsWith("strIngredient")) //keeps only that key
                .map((key) => { //for every item, create something new
                    const i = key.replace("strIngredient", ""); //only keep the number from the key
                    return (
                        <li key={key}>
                            {recipe[key]} - {recipe[`strMeasure${i}`]} //now the number that was stored in the const i can be used to match the ingredient and measure numbers.
                        </li>
                    );
                })}
            </ul>

            <button onClick={onBack}>Back</button>
        </div>
    )
}