// src/pages/RecipeDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import VideoPlayer from "../components/VideoPlayer";
import RatingStars from "../components/RatingStars";
import CommentSection from "../components/CommentSection";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/recipes/${id}`);

      // Fix video path
      if (data.video) {
        data.video = `${import.meta.env.VITE_API_URL.replace("/api", "")}${data.video}`;
      }

      setRecipe(data);

      const favRes = await api.get("/recipes/favorites");
      const favIds = favRes.data.map((fav) => fav._id || fav.recipe?._id);
      setIsFavorite(favIds.includes(id));
    } catch (err) {
      console.error("Failed to fetch recipe:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await api.delete("/recipes/favorites", { data: { recipeId: id } });
        setIsFavorite(false);
      } else {
        await api.post("/recipes/favorites", { recipeId: id });
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500 text-lg animate-pulse">
        Loading recipe...
      </p>
    );

  if (!recipe)
    return (
      <p className="text-center mt-20 text-red-500 text-lg">
        Recipe not found.
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      {/* Title & Favorite */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 md:mb-0">
          {recipe.title}
        </h1>
        <button
          onClick={toggleFavorite}
          className={`px-6 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${
            isFavorite
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-lg mb-10 leading-relaxed border-l-4 border-yellow-400 pl-4">
        {recipe.description}
      </p>

      {/* Video */}
      {recipe.video && (
        <div className="mb-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
          <VideoPlayer videoUrl={recipe.video} />
        </div>
      )}

      {/* Ingredients & Steps */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Ingredients */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            🧾 Ingredients
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {recipe.ingredients?.map((ing, idx) => (
              <li key={idx} className="text-base">{ing}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            👩‍🍳 Steps
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            {recipe.steps?.map((step, idx) => (
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

      {/* Ratings */}
      <div className="mb-10 bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">⭐ Ratings</h2>
        <RatingStars recipe={recipe} onUpdate={fetchRecipe} />
      </div>

      {/* Comments */}
      <div className="mb-10 bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">💬 Comments</h2>
        <CommentSection recipe={recipe} onUpdate={fetchRecipe} />
      </div>
    </div>
  );
}
