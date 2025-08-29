

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import RatingStars from "../components/RatingStars";
import CommentSection from "../components/CommentSection";
import VideoPlayer from "../components/VideoPlayer";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // ✅ Fetch recipe + favorites
  const fetchRecipe = async () => {
    try {
      setLoading(true);

      // Fetch recipe details
      const { data } = await api.get(`/recipes/${id}`);
      setRecipe(data);

      // Fetch favorites with the corrected path
      const favRes = await api.get("/recipes/favorites"); // Path is correct
      // Use fav.recipe?._id to get the correct recipe ID from the favorite object
      const favIds = favRes.data.map((fav) => fav._id || fav.recipe?._id);
      setIsFavorite(favIds.includes(id));
    } catch (err) {
      console.error("Failed to fetch recipe:", err);
      alert("Failed to load recipe.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Toggle favorite
  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        // Corrected path for DELETE request
        await api.delete("/recipes/favorites", { data: { recipeId: id } }); // Path is correct
        setIsFavorite(false);
      } else {
        // Corrected path for POST request
        await api.post("/recipes/favorites", { recipeId: id }); // Path is correct
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      alert("Something went wrong while updating favorites.");
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500 text-lg animate-pulse">
        Loading...
      </p>
    );

  if (!recipe)
    return (
      <p className="text-center mt-20 text-red-500 text-lg">
        Recipe not found.
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 md:p-10 bg-gray-50 rounded-3xl shadow-xl">
      {/* Title + Favorite */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-5xl font-extrabold text-gray-900">
          {recipe.title}
        </h1>
        <button
          onClick={toggleFavorite}
          className={`px-4 py-2 rounded-xl text-white font-semibold shadow-md transition ${
            isFavorite
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
        </button>
      </div>

      {/* Description */}
      <p className="mb-8 text-gray-700 text-lg leading-relaxed">
        {recipe.description}
      </p>

      {/* Video */}
      {recipe.video && <VideoPlayer videoUrl={recipe.video} />}

      {/* Ingredients & Steps */}
      <div className="grid md:grid-cols-2 gap-10 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            Ingredients
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">Steps</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            {recipe.steps.map((step, idx) => (
              <li
                key={idx}
                className="bg-gray-50 p-3 rounded-xl shadow-sm hover:bg-gray-100 transition-colors duration-200"
              >
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-10 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          Rate this Recipe
        </h2>
        <RatingStars recipe={recipe} onUpdate={fetchRecipe} />
      </div>

      {/* Comments */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Comments</h2>
        <CommentSection recipe={recipe} onUpdate={fetchRecipe} />
      </div>
    </div>
  );
};

export default RecipeDetails;