import React, { useState } from "react";
import api from "../api/axios"; // ✅ use lowercase 'api'
import { useAuth } from "../context/AuthContext";

const CommentSection = ({ recipe, onUpdate }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState("");

  const handleAddComment = async () => {
    if (!comment.trim()) return alert("Comment text required");
    if (!user) return alert("Please log in to comment.");

    try {
      const { data } = await api.post(
        `/recipes/${recipe._id}/comment`,
        { text: comment }
      );

      setComment("");
      if (onUpdate) onUpdate(); // Refresh recipe details
    } catch (err) {
      console.error("Failed to add comment:", err);
      alert(
        err.response?.data?.message || "Failed to add comment. Check if you are logged in."
      );
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Comments</h3>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {(recipe.comments || []).map((c, idx) => (
          <div key={idx} className="bg-gray-100 p-2 rounded-md text-gray-700">
            <strong>{c.user}:</strong> {c.comment}
          </div>
        ))}
      </div>

      {user && (
        <div className="mt-4 flex space-x-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-500"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
