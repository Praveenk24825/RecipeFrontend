import React, { useState } from "react";

const SearchFilterPanel = ({ recipes, setFiltered }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    const filteredRecipes = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(value)
    );

    setFiltered(filteredRecipes); // ✅ use setFiltered, not setRecipes
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Search recipes..."
      className="px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  );
};

export default SearchFilterPanel;
