import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import RatingStars from "../components/RatingStars";
import CommentSection from "../components/CommentSection";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/recipes/${id}`);
      setRecipe(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch recipe.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (loading) return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  if (!recipe) return <p className="text-center mt-20 text-red-500">Recipe not found.</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 md:p-10 bg-gray-50 rounded-3xl shadow-xl">
      
      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-6">{recipe.title}</h1>

      {/* Image */}
      <img
        src={recipe.photo || "https://via.placeholder.com/800x400?text=No+Image"}
        alt={recipe.title}
        className="w-full h-96 object-cover rounded-2xl mb-6"
      />

      {/* Video */}
      {recipe.video && (
        <video controls className="w-full h-96 mb-6 rounded-2xl">
          <source src={recipe.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Description */}
      <p className="mb-6 text-gray-700 text-lg">{recipe.description}</p>

      {/* Ingredients */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold mb-3">Ingredients</h2>
        <ul className="list-disc list-inside space-y-2">
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold mb-3">Steps</h2>
        <ol className="list-decimal list-inside space-y-3">
          {recipe.steps.map((step, idx) => (
            <li key={idx} className="bg-gray-50 p-3 rounded-xl shadow-sm">
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold mb-3">Rate this Recipe</h2>
        <RatingStars recipe={recipe} onUpdate={fetchRecipe} />
      </div>

      {/* Comments */}
      <div>
        <h2 className="text-3xl font-semibold mb-3">Comments</h2>
        <CommentSection recipe={recipe} onUpdate={fetchRecipe} />
      </div>
    </div>
  );
};

export default RecipeDetails;
