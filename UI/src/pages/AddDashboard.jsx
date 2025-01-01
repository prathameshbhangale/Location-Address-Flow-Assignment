import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { getAddress } from "../apis/address/filter";
import { useSelector , useDispatch} from "react-redux";
import { setAddresses } from "../slices/dashboard";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddDashboard() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    home: false,
    office: false,
    friends: false,
    favourites: false,
    other: false,
  });
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false); // Add loading state
  const token = useSelector((state) => state.user.token);

  const handleFilterChange = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const handleFindClick = async () => {
    if (!token) {
      console.error("Token not available");
      toast.error("please login")
      navigate('/login')
      return;
    }
    console.log("Selected Filters:", filters);
    setLoading(true); // Set loading state

    try {
      const response = await getAddress(filters, token);
      if(response?.success){
        if (response?.data && Array.isArray(response.data)) {
          console.log("Data is an array:", response.data);
        } else {
          console.log("Data is not an array or is undefined");
        }
        dispatch(setAddresses(response.data));
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const isButtonDisabled = Object.values(filters).every((value) => !value); // Disable button if no filters

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
                  checked={filters.other}
                  onChange={() => handleFilterChange("other")}
                  className="form-checkbox h-4 w-4 text-green-500"
                />
                <span>Other</span>
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
            disabled={isButtonDisabled || loading}
            className={`mt-6 w-full py-2 rounded text-white ${
              isButtonDisabled || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Finding..." : "Find"}
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
