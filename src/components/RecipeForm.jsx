import React, { useState } from "react";
import API from "../api/axios";

const RecipeForm = ({ recipe, onSuccess }) => {
  const [title, setTitle] = useState(recipe?.title || "");
  const [description, setDescription] = useState(recipe?.description || "");
  const [ingredients, setIngredients] = useState(recipe?.ingredients?.join(", ") || "");
  const [steps, setSteps] = useState(recipe?.steps?.join(", ") || "");
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("ingredients", ingredients.split(",").map(i => i.trim()));
      formData.append("steps", steps.split(",").map(s => s.trim()));
      if (photo) formData.append("photo", photo);
      if (video) formData.append("video", video);

      if (recipe?._id) {
        await API.put(`/recipes/${recipe._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/recipes", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Recipe saved successfully!");
      if (onSuccess) onSuccess();
      setTitle(""); setDescription(""); setIngredients(""); setSteps(""); setPhoto(null); setVideo(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save recipe.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md space-y-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">{recipe?._id ? "Edit Recipe" : "Add Recipe"}</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
        required
      />

      <input
        type="text"
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
        required
      />

      <input
        type="text"
        placeholder="Steps (comma separated)"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
        required
      />

      <div className="flex space-x-4">
        <div>
          <label className="block mb-1">Photo</label>
          <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
        </div>
        <div>
          <label className="block mb-1">Video</label>
          <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
        </div>
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
      >
        {recipe?._id ? "Update Recipe" : "Add Recipe"}
      </button>
    </form>
  );
};

export default RecipeForm;
