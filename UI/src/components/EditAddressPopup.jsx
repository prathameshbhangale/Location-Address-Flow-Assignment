import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddresses, updateAddress } from "../slices/dashboard";
import { updateAddress as updateAddressApi } from "../apis/address/update";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditAddressPopup = ({ address, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  const [formValues, setFormValues] = useState(address);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        latitude: formValues.latitude,
        longitude: formValues.longitude,
        houseNumber: formValues.houseNumber,
        street: formValues.street,
        address: formValues.address,
        category: formValues.category,
        isFavorite: formValues.isFavorite,
      };
      const params = {
        id: address._id,
      };
      const response = await updateAddressApi(body, params, token);
      if (response.success) {
        let addressId = address._id;
        let updatedAddress = response?.address;
        dispatch(updateAddress(addressId, updatedAddress));
        toast.success("Address updated successfully");
        onClose(); // Close the popup
        dispatch(setAddresses([]))
        navigate("/address"); // Navigate to /address
      } else {
        toast.error("Failed to update address");
      }
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Edit Address</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">House Number</label>
            <input
              type="text"
              name="houseNumber"
              value={formValues.houseNumber || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Street</label>
            <input
              type="text"
              name="street"
              value={formValues.street}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={formValues.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Friends & Family">Friends & Family</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Mark as Favorite</label>
            <input
              type="checkbox"
              name="isFavorite"
              checked={formValues.isFavorite || false}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose} // Close the popup
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddressPopup;
