import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import RecipeCard from "../components/RecipeCard";
import { motion } from "framer-motion";
import { FaUtensils, FaHeart, FaStar } from "react-icons/fa";

export default function Profile() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user?._id) {
      axios.get(`/users/${user._id}/recipes`).then((res) => setRecipes(res.data));
      axios.get(`/recipes/favorites`).then((res) => setFavorites(res.data));
    }
  }, [user]);

  if (!user) {
    return <p className="text-center mt-10 text-gray-600 dark:text-gray-300">Loading profile...</p>;
  }

  // ✅ Default or custom profile image
  const avatarUrl =
    user?.photo && user.photo.trim() !== ""
      ? user.photo
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.name || "User"
        )}&background=0D8ABC&color=fff`;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* 🧑‍🍳 Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 mb-10"
      >
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150?text=User";
            }}
          />
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {user.name || "Anonymous User"}
          </h1>
          <p className="text-gray-500 dark:text-gray-300">{user.email}</p>
          <p className="mt-2 text-sm text-indigo-500 font-medium">
            Recipe Creator 🍳
          </p>
        </div>
      </motion.div>

      {/* 📊 Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10"
      >
        {/* Recipes Count */}
        <div className="flex items-center justify-between bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-5 rounded-xl shadow-lg">
          <div>
            <h3 className="text-lg font-semibold">Your Recipes</h3>
            <p className="text-2xl font-bold">{recipes.length}</p>
          </div>
          <FaUtensils size={32} />
        </div>

        {/* Favorites Count */}
        <div className="flex items-center justify-between bg-gradient-to-r from-pink-500 to-rose-600 text-white p-5 rounded-xl shadow-lg">
          <div>
            <h3 className="text-lg font-semibold">Favorites</h3>
            <p className="text-2xl font-bold">{favorites.length}</p>
          </div>
          <FaHeart size={32} />
        </div>

        {/* Average Rating */}
        <div className="flex items-center justify-between bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-5 rounded-xl shadow-lg">
          <div>
            <h3 className="text-lg font-semibold">Avg. Rating</h3>
            <p className="text-2xl font-bold">
              {recipes.length
                ? (
                    recipes.reduce((acc, r) => acc + (r.rating || 0), 0) /
                    recipes.length
                  ).toFixed(1)
                : "0.0"}
            </p>
          </div>
          <FaStar size={32} />
        </div>
      </motion.div>

      {/* 🍲 Your Recipes Section */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Your Recipes
      </h2>
      {recipes.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No recipes yet. Create your first one!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
