/*
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 transform transition hover:scale-105">
        
        <div className="flex justify-center">
          <img
            src={
              user?.profileImage ||
              "https://images.unsplash.com/photo-1604908177522-55d01c718d03?auto=format&fit=crop&w=150&q=80" // default cooking image
            }
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-green-500 shadow-md object-cover"
          />
        </div>

       
        <h2 className="text-2xl font-bold mt-4 text-gray-800">
          {user?.name || "Guest User"}
        </h2>
        <p className="text-gray-500">{user?.email || "No email available"}</p>

       
        <div className="flex justify-around mt-6 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">
              {user?.followers?.length || 0}
            </p>
            <p className="text-gray-500">Followers</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {user?.following?.length || 0}
            </p>
            <p className="text-gray-500">Following</p>
          </div>
        </div>

   
        <button
          onClick={logout}
          className="mt-6 w-full py-2 bg-red-500 text-white rounded-full font-semibold shadow-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
*/

import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm transform transition duration-300 hover:scale-105">
        {/* Avatar */}
        <div className="flex justify-center">
          <img
            src={
              user?.profileImage ||
              "https://images.unsplash.com/photo-1604908177522-55d01c718d03?auto=format&fit=crop&w=150&q=80"
            }
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-green-500 shadow-md object-cover"
          />
        </div>

        {/* Name + Email */}
        <h2 className="text-2xl font-bold mt-4 text-gray-800 text-center">
          {user?.name || "Guest User"}
        </h2>
        <p className="text-gray-500 text-center">{user?.email || "No email available"}</p>

        {/* Followers / Following */}
        <div className="flex justify-around mt-6 text-center">
          <div className="hover:scale-105 transform transition cursor-pointer">
            <p className="text-2xl font-bold text-green-600">{user?.followers?.length || 0}</p>
            <p className="text-gray-500">Followers</p>
          </div>
          <div className="hover:scale-105 transform transition cursor-pointer">
            <p className="text-2xl font-bold text-green-600">{user?.following?.length || 0}</p>
            <p className="text-gray-500">Following</p>
          </div>
        </div>

        {/* Dynamic Followers Preview */}
        {user?.followers && user.followers.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">Followers</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {user.followers.map((follower, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-400 shadow-sm hover:scale-110 transform transition cursor-pointer"
                  title={follower.name || "Anonymous"}
                >
                  <img
                    src={
                      follower.profileImage ||
                      "https://images.unsplash.com/photo-1604908177522-55d01c718d03?auto=format&fit=crop&w=150&q=80"
                    }
                    alt={follower.name || "Follower"}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={logout}
          className="mt-8 w-full py-3 bg-red-500 text-white rounded-full font-semibold shadow-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
