import React, { useState } from "react";
import API from "../api/axios"; // your axios instance
import RecipeCard from "../components/RecipeCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return; // ignore empty search

    try {
      setLoading(true);
      const { data } = await API.get(`/recipes?search=${query}`);
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Search Recipes</h1>

      <form onSubmit={handleSearch} className="flex mb-6">
        <input
          type="text"
          placeholder="Type recipe name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 border rounded-l-md focus:outline-green-500"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-gray-500">Searching...</p>}

      {!loading && results.length === 0 && query && (
        <p className="text-center text-gray-500">
          No results found for "{query}".
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Search;
