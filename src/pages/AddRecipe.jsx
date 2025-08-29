/*import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleIngredientChange = (i, value) => {
    const temp = [...ingredients];
    temp[i] = value;
    setIngredients(temp);
  };

  const handleStepChange = (i, value) => {
    const temp = [...steps];
    temp[i] = value;
    setSteps(temp);
  };

  const addIngredient = () => setIngredients([...ingredients, ""]);
  const addStep = () => setSteps([...steps, ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Title & description required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ingredients", ingredients.filter(i => i).join(","));
    formData.append("steps", steps.filter(s => s).join(","));
    if (photo) formData.append("photo", photo);
    if (video) formData.append("video", video);

    try {
      setLoading(true);
      const { data } = await api.post("/recipes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Recipe added successfully!");
      navigate(`/recipes/${data._id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to add recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6">Add Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
 
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
        />

    
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
        />

      
        <div>
          <h2 className="font-semibold mb-2">Ingredients</h2>
          {ingredients.map((ing, idx) => (
            <input
              key={idx}
              value={ing}
              onChange={(e) => handleIngredientChange(idx, e.target.value)}
              placeholder={`Ingredient ${idx + 1}`}
              className="w-full p-2 mb-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          ))}
          <button type="button" onClick={addIngredient} className="px-4 py-2 bg-green-500 text-white rounded-lg">
            + Add Ingredient
          </button>
        </div>

      
        <div>
          <h2 className="font-semibold mb-2">Steps</h2>
          {steps.map((step, idx) => (
            <input
              key={idx}
              value={step}
              onChange={(e) => handleStepChange(idx, e.target.value)}
              placeholder={`Step ${idx + 1}`}
              className="w-full p-2 mb-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          ))}
          <button type="button" onClick={addStep} className="px-4 py-2 bg-green-500 text-white rounded-lg">
            + Add Step
          </button>
        </div>

       
        <div>
          <label className="font-semibold mb-1 block">Upload Photo (optional)</label>
          <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
        </div>

        
        <div>
          <label className="font-semibold mb-1 block">Upload Video (optional)</label>
          <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
        </div>

      
        <button type="submit" disabled={loading} className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold">
          {loading ? "Adding..." : "Add Recipe"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
*/

import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleIngredientChange = (i, value) => {
    const temp = [...ingredients];
    temp[i] = value;
    setIngredients(temp);
  };
  const handleStepChange = (i, value) => {
    const temp = [...steps];
    temp[i] = value;
    setSteps(temp);
  };
  const addIngredient = () => setIngredients([...ingredients, ""]);
  const addStep = () => setSteps([...steps, ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Title & description required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ingredients", ingredients.filter(i => i).join(","));
    formData.append("steps", steps.filter(s => s).join(","));
    if (photo) formData.append("photo", photo);
    if (video) formData.append("video", video);

    try {
      setLoading(true);
      const { data } = await api.post("/recipes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Recipe added successfully!");
      navigate(`/recipes/${data._id}`);
    } catch (err) {
      console.error("Add recipe error:", err.response || err);
      alert("Failed to add recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6">Add Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"/>
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"/>
        
        <div>
          <h2 className="font-semibold mb-2">Ingredients</h2>
          {ingredients.map((ing, idx) => (
            <input key={idx} value={ing} onChange={e => handleIngredientChange(idx, e.target.value)} placeholder={`Ingredient ${idx+1}`} className="w-full p-2 mb-2 border rounded-lg focus:ring-2 focus:ring-green-500"/>
          ))}
          <button type="button" onClick={addIngredient} className="px-4 py-2 bg-green-500 text-white rounded-lg">+ Add Ingredient</button>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Steps</h2>
          {steps.map((step, idx) => (
            <input key={idx} value={step} onChange={e => handleStepChange(idx, e.target.value)} placeholder={`Step ${idx+1}`} className="w-full p-2 mb-2 border rounded-lg focus:ring-2 focus:ring-green-500"/>
          ))}
          <button type="button" onClick={addStep} className="px-4 py-2 bg-green-500 text-white rounded-lg">+ Add Step</button>
        </div>

        <div>
          <label>Upload Photo (optional)</label>
          <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])}/>
        </div>

        <div>
          <label>Upload Video (optional)</label>
          <input type="file" accept="video/*" onChange={e => setVideo(e.target.files[0])}/>
        </div>

        <button type="submit" disabled={loading} className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold">
          {loading ? "Adding..." : "Add Recipe"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
