import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RecipeCard({ recipe, onDelete }) {
  const { user } = useAuth();
  const isOwner = user && user._id === recipe.user;

  // ✅ Utility to get full image URL (works for local & deployed)
  const getImageUrl = (photo) => {
    if (!photo) return "https://via.placeholder.com/400x300?text=No+Image";
    return `${import.meta.env.VITE_API_URL.replace("/api", "")}${photo}`;
  };

  const imageUrl = getImageUrl(recipe.photo);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      {/* Image links to recipe details */}
      <Link to={`/recipes/${recipe._id}`}>
        <img
          src={imageUrl}
          alt={recipe.title}
          className="w-full h-52 object-cover hover:scale-105 transition duration-300"
        />
      </Link>

      <div className="p-4">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 hover:text-green-600 transition">
          <Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {recipe.description || "No description available"}
        </p>

        {/* Cooking info */}
        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
          <span>⏱ {recipe.cookingTime || 30} min</span>
          <span>🍽 {recipe.servings || 1} servings</span>
        </div>

        {/* Delete button for owner */}
        {isOwner && (
          <button
            onClick={onDelete}
            className="mt-3 w-full bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete Recipe
          </button>
        )}
      </div>
    </div>
  );
}
