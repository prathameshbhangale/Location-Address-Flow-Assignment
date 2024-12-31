import React from "react";
import { Link } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { getLocation } from "../helper/locationPermission";

const Navbar = () => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  getLocation(dispatch)
  console.log(token);

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-2xl font-bold">
            <span className="text-red-600">Place</span>
            <span className="text-gray-300">Mark</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <button className="bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-700">
            Current Location
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-700">
            Delivery
          </button>
        </div>

        {/* Right Section: Profile or Auth Links */}
        <div className="flex items-center gap-4">
          {token ? (
            <Link to="/profile">
              <FaUserCircle className="text-white text-3xl hover:text-gray-200" />
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-700"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-700"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
