import React, { useEffect, useState } from "react";
import api from "../api/axios"; // axios instance
import { useAuth } from "../context/AuthContext";

const User = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Follow a user
  const handleFollow = async (userId) => {
    try {
      await api.put(`/users/${userId}/follow`);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId
            ? { ...u, followers: [...(u.followers || []), user._id] }
            : u
        )
      );
    } catch (err) {
      console.error("Error following user:", err);
    }
  };

  // Unfollow a user
  const handleUnfollow = async (userId) => {
    try {
      await api.put(`/users/${userId}/unfollow`);
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId
            ? { ...u, followers: (u.followers || []).filter((f) => f !== user._id) }
            : u
        )
      );
    } catch (err) {
      console.error("Error unfollowing user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🌍 Explore Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users.map((u) => (
            <div
              key={u._id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center"
            >
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600 mb-3">
                {u.name?.charAt(0).toUpperCase()}
              </div>

              {/* Name + Followers */}
              <h3 className="font-semibold text-gray-700">{u.name}</h3>
              <p className="text-sm text-gray-500 mb-3">
                {u.followers?.length || 0} followers
              </p>

              {/* Follow/Unfollow button */}
              {user && user._id !== u._id && (
                u.followers?.includes(user._id) ? (
                  <button
                    onClick={() => handleUnfollow(u._id)}
                    className="w-full bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow(u._id)}
                    className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition"
                  >
                    Follow
                  </button>
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default User;
