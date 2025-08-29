import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function RecipeDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const backendUrl = import.meta.env.VITE_API_URL.replace("/api", "");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        const data = res.data;
        setRecipe(data);

        if (user) {
          const favRes = await api.get("/recipes/favorites", {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setIsFavorite(favRes.data.some((fav) => fav._id === data._id));
        }
      } catch (err) {
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id, user]);

  const toggleFavorite = async () => {
    if (!user) return;
    try {
      if (isFavorite) {
        await api.delete(
          "/recipes/favorites",
          { data: { recipeId: recipe._id } },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
      } else {
        await api.post(
          "/recipes/favorites",
          { recipeId: recipe._id },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!recipe) return <p className="text-center mt-6 text-red-500">Recipe not found.</p>;

  const videoUrl = recipe.video ? `${backendUrl}${recipe.video}` : null;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-6">
      {videoUrl ? (
        <video
          src={videoUrl}
          controls
          className="w-full h-64 rounded-lg object-cover"
          type="video/mp4"
          onError={() => console.error("Video failed to load:", videoUrl)}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <p className="text-center text-gray-500">No video available</p>
      )}

      <h2 className="text-2xl font-bold mt-4">{recipe.title}</h2>
      <p className="text-gray-700 mt-2">{recipe.description}</p>

      {user && (
        <button
          onClick={toggleFavorite}
          className={`mt-4 px-4 py-2 rounded-lg ${
            isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
          } hover:opacity-90 transition`}
        >
          {isFavorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
        </button>
      )}
    </div>
  );
}
