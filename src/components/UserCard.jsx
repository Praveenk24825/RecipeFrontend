import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import UserCard from "../components/UserCard";

const User = () => {
  const { user, updateUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    if (!user?.token) return;
    setLoading(true);
    try {
      const res = await api.get("/users");
      const data = Array.isArray(res.data) ? res.data : res.data.users || [];

      // Mark if current user is following each user
      const updated = data.map((u) => ({
        ...u,
        isFollowing: user.following?.includes(u._id),
      }));

      setUsers(updated);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  // Follow
  const handleFollow = async (id) => {
    try {
      const res = await api.put(`/users/${id}/follow`);
      const updatedFollowing = [...(user.following || []), id];
      updateUser({ following: updatedFollowing });

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isFollowing: true } : u))
      );
    } catch (err) {
      console.error("Failed to follow user:", err);
      alert(err.response?.data?.message || "Follow failed.");
    }
  };

  // Unfollow
  const handleUnfollow = async (id) => {
    try {
      await api.put(`/users/${id}/unfollow`);
      const updatedFollowing = (user.following || []).filter((fid) => fid !== id);
      updateUser({ following: updatedFollowing });

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isFollowing: false } : u))
      );
    } catch (err) {
      console.error("Failed to unfollow user:", err);
      alert(err.response?.data?.message || "Unfollow failed.");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading users...</p>;
  if (!users.length)
    return <p className="text-center mt-5 text-gray-500">No users found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>
      <div className="space-y-4">
        {users.map((u) => (
          <UserCard
            key={u._id}
            u={u}
            currentUser={user}
            handleFollow={handleFollow}
            handleUnfollow={handleUnfollow}
          />
        ))}
      </div>
    </div>
  );
};

export default User;
