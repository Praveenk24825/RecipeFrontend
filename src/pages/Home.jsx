import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [searchQuery, category, recipes]);

  const fetchRecipes = async () => {
    try {
      const { data } = await API.get("/recipes");
      setRecipes(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
    }
  };

  const filterRecipes = () => {
    let temp = recipes;
    if (searchQuery.trim()) {
      temp = temp.filter((r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (category) {
      temp = temp.filter(
        (r) => r.category?.toLowerCase() === category.toLowerCase()
      );
    }
    setFiltered(temp);
  };

  const handleDelete = (id) => {
    setRecipes(recipes.filter((r) => r._id !== id));
    setFiltered(filtered.filter((r) => r._id !== id));
  };

  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks", "Drinks"];

  // ✅ Helper to build correct image URL
  const getImageUrl = (recipe) => {
    if (recipe.photo) {
      return `${import.meta.env.VITE_API_URL.replace("/api", "")}${recipe.photo}`;
    }
    return "https://via.placeholder.com/300x200?text=No+Image";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-24 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10 px-4">
          <h1 className="text-5xl font-extrabold drop-shadow-lg">
            Discover, Cook & Share
          </h1>
          <p className="mt-4 text-lg text-green-100">
            Your go-to place for delicious recipes and creative meal plans.
          </p>

          {/* Search Bar */}
          <div className="mt-8 flex justify-center shadow-lg">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md p-4 rounded-l-lg border-none focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 font-medium"
            />
            <button
              onClick={filterRecipes}
              className="bg-white text-green-700 px-6 rounded-r-lg font-semibold hover:bg-green-100 transition"
            >
              Search
            </button>
          </div>

          {/* Category Filter */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat === category ? "" : cat)}
                className={`px-5 py-2 rounded-full font-medium transition transform hover:scale-105 ${
                  category === cat
                    ? "bg-white text-green-700 shadow-lg"
                    : "bg-green-200 text-white hover:bg-green-300 hover:text-green-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-56 h-56 bg-green-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      </section>

      {/* Featured Recipes */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🍴 Featured Recipes
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.length > 0 ? (
            filtered.slice(0, 8).map((recipe) => (
              <Link
                key={recipe._id}
                to={`/recipes/${recipe._id}`}
                className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition"
              >
                <img
                  src={getImageUrl(recipe)}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <p className="text-white font-bold text-lg px-2 text-center">
                    {recipe.title}
                  </p>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-gray-800 font-semibold">{recipe.title}</h3>
                  <p className="text-gray-500 text-sm">{recipe.category}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No recipes found.
            </p>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white text-green-800 py-16 text-center border-t border-gray-200">
        <h2 className="text-4xl font-bold">Got a Recipe to Share?</h2>
        <p className="mt-3 text-lg">
          Join our community and inspire others with your cooking!
        </p>
        <Link
          to="/add-recipe"
          className="mt-6 inline-block bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition"
        >
          Add Your Recipe
        </Link>
      </section>
    </div>
  );
};

export default Home;
