// src/pages/MealPlans.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const MealPlans = () => {
  const { user } = useAuth();
  const [mealPlans, setMealPlans] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [selectedRecipes, setSelectedRecipes] = useState({});

  // Fetch meal plans & recipes
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const { data: mpData } = await API.get("/mealplans");
        setMealPlans(mpData);

        const { data: recipesData } = await API.get("/recipes");
        setRecipes(recipesData);

        // Initialize selection
        const initSelection = {};
        mpData.forEach((mp) => {
          initSelection[mp._id] = (mp.recipes || []).map((r) => r._id);
        });
        setSelectedRecipes(initSelection);
      } catch (err) {
        console.error("Error fetching meal plans or recipes:", err);
      }
    };

    fetchData();
  }, [user]);

  const handleCreate = async () => {
    if (!title.trim()) return alert("Enter a meal plan title");
    try {
      const { data } = await API.post("/mealplans", { title, recipes: [] });
      setMealPlans([data, ...mealPlans]);
      setSelectedRecipes((prev) => ({ ...prev, [data._id]: [] }));
      setTitle("");
    } catch (err) {
      console.error("Error creating meal plan:", err);
      alert(err.response?.data?.message || "Error creating meal plan");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this meal plan?")) return;
    try {
      await API.delete(`/mealplans/${id}`);
      setMealPlans(mealPlans.filter((mp) => mp._id !== id));
      setSelectedRecipes((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (err) {
      console.error("Error deleting meal plan:", err);
      alert("Failed to delete meal plan");
    }
  };

  const startEdit = (id, currentTitle) => {
    setEditingId(id);
    setEditingTitle(currentTitle);
  };

  const saveEdit = async (id) => {
    if (!editingTitle.trim()) return alert("Title cannot be empty");
    try {
      const { data } = await API.put(`/mealplans/${id}`, { title: editingTitle });
      setMealPlans(mealPlans.map((mp) => (mp._id === id ? data : mp)));
      setEditingId(null);
      setEditingTitle("");
    } catch (err) {
      console.error("Error updating meal plan:", err);
      alert("Failed to update meal plan");
    }
  };

  const toggleRecipe = (mealPlanId, recipeId) => {
    setSelectedRecipes((prev) => {
      const current = prev[mealPlanId] || [];
      if (current.includes(recipeId)) {
        return { ...prev, [mealPlanId]: current.filter((r) => r !== recipeId) };
      } else {
        return { ...prev, [mealPlanId]: [...current, recipeId] };
      }
    });
  };

  const saveRecipes = async (mealPlanId) => {
    try {
      const { data } = await API.put(`/mealplans/${mealPlanId}`, {
        recipes: selectedRecipes[mealPlanId] || [],
      });
      setMealPlans(mealPlans.map((mp) => (mp._id === mealPlanId ? data : mp)));
      alert("Recipes updated!");
    } catch (err) {
      console.error("Error saving recipes:", err);
      alert("Failed to save recipes");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">My Meal Plans</h1>

      {/* Create Meal Plan */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 mb-6">
        <input
          type="text"
          placeholder="New Meal Plan Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-3 border rounded shadow-sm focus:ring-2 focus:ring-green-400 outline-none transition"
        />
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
        >
          Create Meal Plan
        </button>
      </div>

      {/* Meal Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mealPlans.length === 0 && (
          <p className="col-span-full text-gray-500 text-center text-lg">
            No meal plans yet. Create one above.
          </p>
        )}

        {mealPlans.map((mp) => (
          <div
            key={mp._id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition space-y-4"
          >
            {/* Title / Edit */}
            {editingId === mp._id ? (
              <div className="flex space-x-2 items-center">
                <input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <button
                  onClick={() => saveEdit(mp._id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">{mp.title}</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEdit(mp._id, mp.title)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(mp._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}

            {/* Recipes */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Select Recipes:</h3>
              <div className="flex flex-wrap gap-2">
                {recipes.map((r) => (
                  <button
                    key={r._id}
                    onClick={() => toggleRecipe(mp._id, r._id)}
                    className={`px-3 py-1 rounded-lg border text-sm font-medium transition ${
                      (selectedRecipes[mp._id] || []).includes(r._id)
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {r.title}
                  </button>
                ))}
              </div>
              <button
                onClick={() => saveRecipes(mp._id)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Save Recipes
              </button>
              <p className="text-gray-500 mt-1 text-sm">
                Total Recipes: {(mp.recipes || []).length}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlans;
