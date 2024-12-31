import React, { useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const HomePage = () => {

    let defaultCenter = {
        lat: useSelector((state) => state.location.latitude),
        lng: useSelector((state) => state.location.longitude), 
    };
    let permission = useSelector((state)=>state.location.ispermission)
    console.log(permission)
    if(!(defaultCenter.lng && defaultCenter.lat)){
        defaultCenter.lng =73.8567;
        defaultCenter.lat =18.5204;
    }

  const apiKey = import.meta.env.VITE_API_GOOGLE_MAP_API_KEY;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey, // Your API key
  });


  if (!isLoaded) {
    return <div className="text-center mt-10 text-orange-500">Loading Map...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-orange-600 mb-4">Welcome to the Map</h1>
      <div className="shadow-lg h-5/6 w-5/6 rounded-lg overflow-hidden border border-gray-200">
        <GoogleMap
          
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={12}
        >
            {permission && <Marker position={defaultCenter} />}
            
        </GoogleMap>
      </div>
    </div>
  );
};

export default HomePage;
