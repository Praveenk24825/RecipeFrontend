// src/components/FavoriteButton.jsx
import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const FavoriteButton = ({ recipe, onUpdate }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if current recipe is in user's favorites
  useEffect(() => {
    if (user && recipe?._id) {
      setIsFavorite(user?.favorites?.includes(recipe._id));
    }
  }, [user, recipe]);

  const toggleFavorite = async () => {
    if (!user) {
      alert("Please log in to save favorites.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post(
        `/users/favorites/${recipe._id}`, // <-- backend route
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setIsFavorite(res.data.favorites.includes(recipe._id));

      if (onUpdate) onUpdate(); // refresh recipe details
    } catch (err) {
      console.error("Failed to update favorites:", err);
      alert(err.response?.data?.message || "Something went wrong while updating favorites.");
    } finally {
      setLoading(false);
    }
  };

  if (!recipe) return null;

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`px-4 py-2 rounded-md shadow ${
        isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
      }`}
    >
      {isFavorite ? "♥ Favorited" : "♡ Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
