import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress as deleteAddressAction } from "../slices/dashboard";
import { deleteAddress } from "../apis/address/delete"; // API call
import toast from "react-hot-toast";
import EditAddressPopup from "./EditAddressPopup"; // Import the EditAddressPopup component

const AddressItem = ({ address }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const [isEditing, setIsEditing] = useState(false); // State to handle the popup visibility

  const onDelete = async (id) => {
    try {
      const response = await deleteAddress({ id }, token); // API call to delete the address

      if (response?.success) {
        // Update Redux state by dispatching the action
        dispatch(deleteAddressAction(id));
        toast.success("Address deleted successfully");
      } else {
        toast.error("Failed to delete address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
      <p>
        <strong>Latitude:</strong> {address.latitude}
      </p>
      <p>
        <strong>Longitude:</strong> {address.longitude}
      </p>
      {address.houseNumber && (
        <p>
          <strong>House Number:</strong> {address.houseNumber}
        </p>
      )}
      <p>
        <strong>Address:</strong> {address.address}
      </p>
      <p>
        <strong>Street:</strong> {address.street}
      </p>
      <p>
        <strong>Category:</strong> {address.category}
      </p>
      <p>
        <strong>Favorite:</strong> {address.isFavorite ? "Yes" : "No"}
      </p>
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={() => setIsEditing(true)} // Open the edit popup
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(address._id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      {/* Render EditAddressPopup if isEditing is true */}
      {isEditing && <EditAddressPopup address={address} onClose={() => setIsEditing(false)} />}
    </div>
  );
};

export default AddressItem;
