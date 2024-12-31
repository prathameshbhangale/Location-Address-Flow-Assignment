import React from "react";
import MapComponent from "../components/MapComponent"; 
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <header className="text-center m-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to the Home Page</h1>
      </header>

      <main className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        {/* Display the map with location and search enabled */}
        <MapComponent enableSearch={true} />
      </main>

      <Link
        to="/add-address"
        className="w-32 mt-4 h-12 flex items-center justify-center px-4 py-2 bg-green-500 text-white font-medium text-lg rounded-full shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-300 focus:outline-none transition duration-200"
      >
        Proceed
      </Link>

    </div>
  );
};

export default HomePage;
