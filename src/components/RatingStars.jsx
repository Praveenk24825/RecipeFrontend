import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const RatingStars = ({ recipe, onUpdate }) => {
  const { user } = useAuth();
  const [userRating, setUserRating] = useState(0);
  const [loading, setLoading] = useState(false);

  // Compute average rating
  const avgRating = recipe?.ratings?.length
    ? (recipe.ratings.reduce((a, r) => a + r.rating, 0) / recipe.ratings.length).toFixed(1)
    : 0;

  // Set user's current rating
  useEffect(() => {
    if (user && recipe?.ratings) {
      const existing = recipe.ratings.find((r) => r.user === user.name);
      setUserRating(existing ? existing.rating : 0);
    }
  }, [user, recipe]);

  const handleRate = async (rate) => {
    if (!user) {
      alert("Please log in to submit rating.");
      return;
    }

    try {
      setLoading(true);
      await api.put(
        `/recipes/${recipe._id}/rating`,
        {rating: rate },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setUserRating(rate);
      if (onUpdate) onUpdate(); // Refresh recipe details
    } catch (err) {
      console.error("Failed to submit rating:", err);
      alert(err.response?.data?.message || "Failed to submit rating.");
    } finally {
      setLoading(false);
    }
  };

  if (!recipe) return null;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-md shadow-sm">
      <h3 className="font-bold mb-2">
        Rate this recipe (Avg: {avgRating})
      </h3>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            disabled={loading}
            className="focus:outline-none"
          >
            <span className={`text-2xl ${star <= userRating ? "text-yellow-400" : "text-gray-300"}`}>
              ★
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingStars;
