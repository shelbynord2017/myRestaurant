import { useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import RecipeDetail from "./RecipeDetail";

const API = "http://localhost:3002/api/recipes";

export default function App(){
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getRandomRecipe(){
    try{
      setLoading(true);
      const res = await axios.get(`${API}/random`)
      console.log(res.data);
      setSelectedRecipe(res.data);
      
    } catch(error){
      console.error("Unable to load recipe", error);
    } finally{
      setLoading(false);
    }
  }

  async function searchRecipes() {
    if(!search.trim()) return;

    try{
      setLoading(true);
      const res = await axios.get(`${API}/search?ingredient=${encodeURIComponent(search)}`)
      setRecipes(res.data || []);
      
    }catch(error){
      console.error(`Unable to find recipes including ${search}`)
    } finally{
      setLoading(false);
    }
  }

  async function viewRecipe(id){
    if(!id) return;

    try{
      setLoading(true)
      const res = await axios.get(`${API}/recipes/${id}`)
      setSelectedRecipe(res.data || []);
    } catch(error){
      console.error(`Unable to find recipe with id: ${id}`)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>Recipe Remix</h1>

      <div style={{ marginBottom: "20px" }}>
        <input 
          type="text" 
          placeholder="Search by ingredient..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)} //when the input changes, get the new value from the input and put it in state. You need the event obj to access the value.
        />

        <button onClick={searchRecipes}>Search</button>

        <button onClick={getRandomRecipe} style={{marginLeft: "10px"}}>
          Surprise Me!
        </button>
      </div>

      {loading && <p>"Loading recipes...</p>}

      {selectedRecipe && !loading && (
        <RecipeDetail 
          recipe={selectedRecipe} 
          onBack={() => setSelectedRecipe(null)}
        />
      )}

      {!selectedRecipe && !loading && recipes.length > 0 && (
        <div className="recipe__list">
          {recipes.map((meal) => (
            <RecipeCard key={meal.idMeal} recipe={meal} onSelect={viewRecipe} />
          ))}
        </div>
      )}

      {!selectedRecipe && !loading && recipes.length === 0 && (
        <p>Try searching with a different ingredient like "chicken" or "beef"</p>
      )}
    </div>
  )
}