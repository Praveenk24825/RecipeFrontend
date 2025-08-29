import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300">
      
      {/* Recipe Image */}
      <Link to={`/recipes/${recipe._id}`}>
        <img
          src={recipe.photo || "https://via.placeholder.com/400x250?text=No+Image"}
          alt={recipe.title}
          className="w-full h-60 object-cover"
        />
      </Link>

      {/* Card Content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
        <p className="text-gray-600 text-sm line-clamp-3">{recipe.description}</p>
        
        {/* Optional: Video Preview */}
        {recipe.video && (
          <video controls className="w-full h-40 mt-3 rounded-xl">
            <source src={recipe.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        <Link
          to={`/recipes/${recipe._id}`}
          className="mt-3 inline-block text-blue-600 hover:underline"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
