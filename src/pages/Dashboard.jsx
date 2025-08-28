import { useEffect, useState } from "react";
import API from "../api/axios";
import RecipeCard from "../components/RecipeCard";
import MealPlanCard from "../components/MealPlanCard";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    if (!user?.token) return; // exit if no user

    try {
      // Recipes
      const { data: recipesData } = await API.get("/recipes");
      const myRecipes = recipesData.filter(
        (r) => r.createdBy?._id === user._id || r.createdBy === user._id
      );
      setRecipes(myRecipes);

      // Meal plans
      const { data: mealData } = await API.get("/mealplans");
      const myMeals = mealData.filter(
        (m) => m.createdBy?._id === user._id || m.createdBy === user._id
      );
      setMealPlans(myMeals);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const refreshDashboard = () => fetchDashboardData();

  // Return null or loader if user is not loaded yet
  if (!user) return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-500 to-green-700 text-white py-8 px-6 rounded-b-3xl shadow-lg">
        <h1 className="text-4xl font-bold">Welcome, {user?.name || "User"}!</h1>
        <p className="mt-2 text-green-100">
          Here’s your personal recipe and meal plan dashboard.
        </p>
      </header>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">My Recipes</h2>
          <p className="text-3xl font-bold">{recipes.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Meal Plans</h2>
          <p className="text-3xl font-bold">{mealPlans.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Followers</h2>
          <p className="text-3xl font-bold">{user?.followers?.length || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Balance</h2>
          <p className="text-3xl font-bold">
            ${user?.balance?.toFixed(2) || "0.00"}
          </p>
        </div>
      </section>

      {/* My Recipes */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">My Recipes</h2>
        {recipes.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                refreshDashboard={refreshDashboard}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't added any recipes yet.</p>
        )}
      </section>

      {/* My Meal Plans */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">My Meal Plans</h2>
        {mealPlans.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {mealPlans.map((plan) => (
              <MealPlanCard
                key={plan._id}
                plan={plan}
                refreshDashboard={refreshDashboard}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No meal plans created yet.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;  