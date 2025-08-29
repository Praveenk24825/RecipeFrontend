import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await api.get(`/recipes/${id}`);
        setRecipe(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const getMediaUrl = (path) =>
    path ? `${import.meta.env.VITE_API_URL.replace("/api", "")}${path}` : null;

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!recipe) return <p className="text-center mt-10">Recipe not found</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-6">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

      {/* Image */}
      {recipe.photo && (
        <img
          src={getMediaUrl(recipe.photo)}
          alt={recipe.title}
          className="w-full h-80 object-cover rounded-xl mb-6"
        />
      )}

      {/* Video */}
      {recipe.video && (
        <video
          src={getMediaUrl(recipe.video)}
          controls
          className="w-full rounded-xl mb-6"
        />
      )}

      <p className="text-gray-700 mb-4">{recipe.description}</p>

      {/* Ingredients */}
      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Steps */}
      {recipe.steps && recipe.steps.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Steps</h2>
          <ol className="list-decimal pl-6 text-gray-700">
            {recipe.steps.map((step, i) => (
              <li key={i} className="mb-2">{step}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Ratings & Comments */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Ratings & Comments</h2>
        {recipe.comments && recipe.comments.length > 0 ? (
          recipe.comments.map((c, i) => (
            <div key={i} className="border-b py-2">
              <p className="text-sm text-gray-800">{c.text}</p>
              <p className="text-xs text-gray-500">by {c.user?.name}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet</p>
        )}
      </div>
    </div>
  );
}
