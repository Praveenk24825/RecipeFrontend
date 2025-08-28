import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout, favoritesCount } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const goToFavorites = () => {
    setDropdownOpen(false);
    setMenuOpen(false);
    navigate("/favorites");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Logo */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-2xl font-bold text-green-600 hover:text-green-700"
            >
              RecipeApp
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                to="/"
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/recipes"
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Recipes
              </Link>

              {user && (
                <>
                  <button
                    onClick={goToFavorites}
                    className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium relative"
                  >
                    Favorites
                    {favoritesCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {favoritesCount}
                      </span>
                    )}
                  </button>

                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/search"
                    className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Search
                  </Link>
                  <Link
                    to="/add-recipe"
                    className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Add Recipe
                  </Link>
                  <Link
                    to="/meal-plan"
                    className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Meal Plan
                  </Link>
                  <Link
                    to="/users"
                    className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Explore
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right: Auth */}
          <div className="flex items-center space-x-4 relative">
            {!user ? (
              <div className="hidden md:flex space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition font-medium"
                >
                  Hi, {user.name}
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={goToFavorites}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex justify-between items-center"
                    >
                      Favorites
                      {favoritesCount > 0 && (
                        <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                          {favoritesCount}
                        </span>
                      )}
                    </button>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/users"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Explore
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700 hover:text-green-600 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              to="/recipes"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Recipes
            </Link>
            {user && (
              <>
                <button
                  onClick={goToFavorites}
                  className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 relative"
                >
                  Favorites
                  {favoritesCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {favoritesCount}
                    </span>
                  )}
                </button>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <Link
                  to="/search"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Search
                </Link>
                <Link
                  to="/add-recipe"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Add Recipe
                </Link>
                <Link
                  to="/meal-plan"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Meal Plan
                </Link>
                <Link
                  to="/users"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Explore
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100 rounded-md"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
