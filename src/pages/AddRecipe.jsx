import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
  });
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append(
        "ingredients",
        JSON.stringify(form.ingredients.split("\n"))
      );
      formData.append("steps", JSON.stringify(form.steps.split("\n")));
      if (photo) formData.append("photo", photo);
      if (video) formData.append("video", video);

      await api.post("/recipes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to add recipe");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          rows="3"
        />

        <textarea
          name="ingredients"
          placeholder="Ingredients (one per line)"
          value={form.ingredients}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          rows="4"
        />

        <textarea
          name="steps"
          placeholder="Steps (one per line)"
          value={form.steps}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          rows="4"
        />

        <div>
          <label className="block font-medium">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>

        <div>
          <label className="block font-medium">Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
