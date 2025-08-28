import React from "react";
import { Link } from "react-router-dom";

export default function MealPlanCard({ plan }) {
  return (
    <div className="border rounded shadow p-4 bg-white hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{plan.title}</h2>
      <p className="text-gray-600 mb-2">Created by: {plan.createdBy.name}</p>
      <ul className="list-disc pl-6 mb-2">
        {plan.recipes.map(recipe => <li key={recipe._id}>{recipe.title}</li>)}
      </ul>
      <Link to={`/mealplans/${plan._id}`} className="text-green-500 hover:underline">View</Link>
    </div>
  );
}
