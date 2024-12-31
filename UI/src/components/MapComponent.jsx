import React, { useCallback, useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { setaddress } from "../slices/locationSlice";
import toast from "react-hot-toast";

const MapComponent = ({ enableSearch }) => {

  const dispatch = useDispatch()
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState(""); // State to hold the address

  const libraries = ["places"];
  const mapContainerStyle = { width: "100%", height: "400px" };
  const defaultCenter = { lat: 37.7749, lng: -122.4194 };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_API_GOOGLE_MAP_API_KEY,
    libraries,
  });

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onDragEnd = (event) => {
    const position = event.latLng;
    setMarkerPosition({ lat: position.lat(), lng: position.lng() });
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPosition(userLocation);
          map.panTo(userLocation);
        },
        (error) => {
          toast.error("Location permission blocked");
          console.error("Geolocation error:", error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleAutocomplete = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMarkerPosition(location);
        map.panTo(location);
      }
    }
  };

  // Reverse geocoding to get address whenever marker position changes
  useEffect(() => {
    if (markerPosition) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: markerPosition }, (results, status) => {
        if (status === "OK" && results[0]) {
          setAddress(results[0].formatted_address);
          dispatch(setaddress(address))
        } else {
          setAddress("Address not found");
        }
      });
    }
  }, [markerPosition,handleLocateMe]); // Re-run when marker position changes

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading maps...</p>;

  return (
    <>
    <div className="relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={markerPosition || defaultCenter}
        onLoad={onLoad}
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            draggable
            onDragEnd={onDragEnd}
          />
        )}
      </GoogleMap>

      {enableSearch && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white shadow-md p-2 rounded-lg">
          <Autocomplete
            onLoad={(autoCompInstance) => setAutocomplete(autoCompInstance)}
            onPlaceChanged={handleAutocomplete}
          >
            <input
              type="text"
              placeholder="Search a location..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </Autocomplete>
        </div>
      )}

      <button
        onClick={handleLocateMe}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md"
      >
        Locate Me
      </button>

      
    </div>
      {/* Display the address below the button */}
      {address && (
        <div className="h-auto mx-auto mt-6 text-center w-3/6 bg-white shadow-md p-2 rounded-lg">
          <p className="text-sm text-gray-700">{address}</p>
        </div>
      )}
    </>
  );
};

export default MapComponent;
