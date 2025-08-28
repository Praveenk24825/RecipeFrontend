import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    cookingTime: "",
    servings: "",
    photo: null,
    video: null,
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await axios.get(`/recipes/${id}`);
        setForm({
          ...data,
          ingredients: data.ingredients.join(", "),
          steps: data.steps.join(", "),
          photo: null,
          video: null,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "photo" || e.target.name === "video") {
      setForm({ ...form, [e.target.name]: e.target.files[0] });
    } else setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    try {
      await axios.put(`/recipes/${id}`, data);
      navigate(`/recipes/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" name="title" value={form.title} onChange={handleChange} required className="border px-3 py-2 rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} required className="border px-3 py-2 rounded" />
        <input type="text" name="ingredients" value={form.ingredients} onChange={handleChange} className="border px-3 py-2 rounded" />
        <input type="text" name="steps" value={form.steps} onChange={handleChange} className="border px-3 py-2 rounded" />
        <input type="number" name="cookingTime" value={form.cookingTime} onChange={handleChange} className="border px-3 py-2 rounded" />
        <input type="number" name="servings" value={form.servings} onChange={handleChange} className="border px-3 py-2 rounded" />
        <input type="file" name="photo" onChange={handleChange} />
        <input type="file" name="video" onChange={handleChange} />
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Update Recipe</button>
      </form>
    </div>
  );
};

export default EditRecipe;
