import React from "react";
import { useSelector } from "react-redux";
import AddressCard from "./AddressCart";


const AddressList = () => {
  const addresses = useSelector((state) => state.dashboard?.addresses || []);


  console.log(addresses);
  if (!Array.isArray(addresses)) {
    return <p className="text-red-500">Invalid addresses data</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Address List</h2>

      {addresses.length === 0 ? (
        <p className="text-gray-500">No addresses found.</p>
      ) : (
        addresses.map((address) => (
          <AddressCard key={address._id} address={address}  />
        ))
      )}
    </div>
  );
};

export default AddressList;
