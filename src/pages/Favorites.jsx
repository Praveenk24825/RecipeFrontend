/* import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user?.token) return;
      try {
        const res = await api.get("/recipes/favorites", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFavorites(res.data);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
        alert("Failed to load favorites.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [user]);

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500 text-lg animate-pulse">
        Loading favorites...
      </p>
    );

  if (!favorites || favorites.length === 0)
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">
        No favorites yet.
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Your Favorite Recipes
      </h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((fav) => (
          <div
            key={fav.recipe?._id || fav._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
          >
        
            {fav.recipe?.photo && (
              <img
                src={fav.recipe.photo}
                alt={fav.recipe?.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-semibold text-xl mb-2 text-gray-900">
                {fav.recipe?.title}
              </h3>
              <p className="text-gray-600 text-sm flex-grow">
                {fav.recipe?.description?.slice(0, 100)}...
              </p>
              <Link
                to={`/recipes/${fav.recipe?._id}`}
                className="mt-4 inline-block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
*/

// src/pages/Favorites.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user?.token) return;
      try {
        const res = await api.get("/recipes/favorites", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFavorites(res.data); // backend returns favorites array
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
        alert("Failed to load favorites.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading favorites...</p>;
  if (!favorites.length) return <p className="text-center mt-10">No favorites yet.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Favorite Recipes</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {favorites.map((fav) => {
          const recipe = fav.recipe || fav; // use populated recipe or fallback
          return (
            <div key={recipe._id} className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{recipe.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{recipe.description}</p>
              <Link
                to={`/recipes/${recipe._id}`}
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                View Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
