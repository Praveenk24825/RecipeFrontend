import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RecipeCard({ recipe, onDelete }) {
  const { user } = useAuth();
  const isOwner = user && user._id === recipe.user;

  // ✅ Use full backend URL
  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
 const imageUrl = recipe.photo
  ? `${backendUrl}${recipe.photo}` // just append photo
  : "https://placehold.co/400x300?text=No+Image";

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      <Link to={`/recipes/${recipe._id}`}>
        <img
          src={imageUrl}
          alt={recipe.title}
          className="w-full h-52 object-cover hover:scale-105 transition duration-300"
        />
      </Link>

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 hover:text-green-600 transition">
          <Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
        </h2>

        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {recipe.description || "No description available"}
        </p>

        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
          <span>⏱ {recipe.cookingTime || 30} min</span>
          <span>🍽 {recipe.servings || 1} servings</span>
        </div>

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
