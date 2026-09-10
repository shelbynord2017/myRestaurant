export default function RecipeCard({ recipe, onSelect }){

    return (
        <div 
        className="card"
        onClick={() => onSelect(recipe.idMeal)}
        style={{ cursor: "pointer" }}
        >
            <h2>{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        </div>
    );
}