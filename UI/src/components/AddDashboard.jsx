import React, { useState } from "react";
import { Outlet } from "react-router-dom";

function AddDashboard() {
  const [filters, setFilters] = useState({
    home: false,
    office: false,
    friends: false,
    favourites: false,
  });

  const handleFilterChange = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const handleFindClick = () => {
    // Logic for handling the search based on selected filters
    console.log("Selected Filters:", filters);
    // You can integrate this with a backend or use it to filter content dynamically
  };

  return (
    <div className="flex h-screen">
      {/* Dashboard Section */}
      <div className="w-1/5 bg-green-800 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-6">
          {/* Filter Options */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Filter Options</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={filters.home}
                  onChange={() => handleFilterChange("home")}
                  className="form-checkbox h-4 w-4 text-green-500"
                />
                <span>Home</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={filters.office}
                  onChange={() => handleFilterChange("office")}
                  className="form-checkbox h-4 w-4 text-green-500"
                />
                <span>Office</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={filters.friends}
                  onChange={() => handleFilterChange("friends")}
                  className="form-checkbox h-4 w-4 text-green-500"
                />
                <span>Friends</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={filters.favourites}
                  onChange={() => handleFilterChange("favourites")}
                  className="form-checkbox h-4 w-4 text-green-500"
                />
                <span>Favourites</span>
              </label>
            </div>
          </div>

          {/* Find Button */}
          <button
            onClick={handleFindClick}
            className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Find
          </button>
        </nav>
      </div>

      {/* Outlet Section */}
      <div className="w-4/5 bg-white p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AddDashboard;
