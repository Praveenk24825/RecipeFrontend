import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const getImageUrl = (recipe) => {
    if (recipe.photo) {
      return `${import.meta.env.VITE_API_URL.replace("/api", "")}${recipe.photo}`;
    }
    return "https://via.placeholder.com/300x200?text=No+Image";
  };

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
      <img
        src={getImageUrl(recipe)}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {recipe.description}
        </p>
        <Link
          to={`/recipes/${recipe._id}`}
          className="text-indigo-600 mt-2 inline-block"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
