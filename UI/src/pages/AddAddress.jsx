import React, { useState } from "react";
import { FaHome, FaBuilding, FaUsers, FaMapMarkerAlt, FaStar, FaRegStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { addAddress } from "../apis/address/add";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"

const AddressForm = () => {
  const address = useSelector((state) => state.location.address);
  const latitude = useSelector((state) => state.location.latitude);
  const longitude = useSelector((state) => state.location.longitude);
  const token = useSelector((state) => state.user.token);

  const [houseNumber, setHouseNumber] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("Others");
  const [isFavourite, setIsFavourite] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    const body = {
      address,
      houseNumber,
      street: area,
      category,
      isFavourite,
      latitude,
      longitude,
    };

    try {
      const response = await addAddress(body, token);
      if (response?.success) {
        toast.success("Address added successfully!");
        navigate("/");  // Redirect to home or desired page
      } else {
        toast.error("Failed to add address.");
      }
    } catch (error) {
      toast.error("An error occurred while saving the address.");
    }
  };

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  if (!address) {
    return (
      <p className="text-center text-green-600 font-medium">
        Select address first on the map
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Address Display */}
      <Link to={'/'} className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4 text-center mb-6">
        <p className="text-lg font-medium text-green-700 flex items-center justify-center">
          <FaMapMarkerAlt className="mr-2 text-green-600" />
          {address}
        </p>
      </Link>

      {/* Address Form */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-green-800 mb-4">Add Address Details</h2>

        {/* House/Flat/Block Input */}
        <div className="mb-4">
          <label htmlFor="houseNumber" className="block text-gray-700 font-medium mb-2">
            House/Flat/Block No.
          </label>
          <input
            type="text"
            id="houseNumber"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
            placeholder="Enter house or flat number"
            className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Apartment/Road/Area Input */}
        <div className="mb-4">
          <label htmlFor="area" className="block text-gray-700 font-medium mb-2">
            Apartment/Road/Area
          </label>
          <input
            type="text"
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter apartment, road, or area"
            className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Category Buttons */}
        <div className="mb-6">
          <p className="text-gray-700 font-medium mb-2">Save as</p>
          <div className="flex justify-around">
            <button
              onClick={() => setCategory("Home")}
              className={`flex flex-col items-center px-4 py-2 rounded-lg ${category === "Home" ? "bg-green-600 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
            >
              <FaHome className="text-xl mb-1" />
              Home
            </button>
            <button
              onClick={() => setCategory("Office")}
              className={`flex flex-col items-center px-4 py-2 rounded-lg ${category === "Office" ? "bg-green-600 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
            >
              <FaBuilding className="text-xl mb-1" />
              Office
            </button>
            <button
              onClick={() => setCategory("Friends")}
              className={`flex flex-col items-center px-4 py-2 rounded-lg ${category === "Friends" ? "bg-green-600 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
            >
              <FaUsers className="text-xl mb-1" />
              Friends
            </button>
          </div>
        </div>

        {/* Favourite Toggle */}
        <div className="mb-4 flex items-center">
          <button onClick={toggleFavourite} className={`${isFavourite ? 'text-green-500' : 'text-gray-500'} hover:text-green-400`}>
            {isFavourite ? <FaStar /> : <FaRegStar />} Favourite
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-green-600 text-white rounded-md py-2 hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
