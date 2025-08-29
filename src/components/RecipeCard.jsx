import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RecipeCard({ recipe, onDelete, onFavorite, favorites }) {
  const { user } = useAuth();
  const isOwner = user && user._id === recipe.user;

  // Backend base URL (remove /api for media)
  const backendUrl = import.meta.env.VITE_API_URL.replace("/api", "");

  // Determine media
  const mediaUrl = recipe.video
    ? `${backendUrl}${recipe.video}`
    : recipe.photo
    ? `${backendUrl}${recipe.photo}`
    : "https://placehold.co/400x300?text=No+Media";

  // Check if recipe is in user's favorites
  const isFavorite = favorites?.some(fav => fav._id === recipe._id);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      {/* Media */}
      <Link to={`/recipes/${recipe._id}`}>
        {recipe.video ? (
          <video
            src={mediaUrl}
            controls
            className="w-full h-52 object-cover hover:scale-105 transition duration-300"
          />
        ) : (
          <img
            src={mediaUrl}
            alt={recipe.title}
            className="w-full h-52 object-cover hover:scale-105 transition duration-300"
          />
        )}
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

        {/* Extra info */}
        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
          <span>⏱ {recipe.cookingTime || 30} min</span>
          <span>🍽 {recipe.servings || 1} servings</span>
        </div>

        {/* Favorites & Delete */}
        <div className="flex gap-2 mt-3">
          {user && (
            <button
              onClick={() => onFavorite(recipe._id)}
              className={`px-3 py-2 rounded-lg w-full ${
                isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
              } transition hover:opacity-90`}
            >
              {isFavorite ? "♥ Favorited" : "♡ Favorite"}
            </button>
          )}
          {isOwner && (
            <button
              onClick={onDelete}
              className="px-3 py-2 rounded-lg w-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
