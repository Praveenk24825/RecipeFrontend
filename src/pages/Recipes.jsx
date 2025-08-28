import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import API from "../api/axios";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await API.get("/recipes");
        setRecipes(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default Recipes; // ✅ Make sure this exists
