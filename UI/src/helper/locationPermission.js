import { toast } from "react-hot-toast";
import { setCoordinates } from "../slices/locationSlice"; 

export const getLocation = (dispatch) => {
  if (navigator.geolocation) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              dispatch(
                setCoordinates({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                })
              );
            //   toast.success("Location retrieved successfully!");
            },
            (err) => {
            //   toast.error(`Failed to get location: ${err.message}`);
            }
          );
        } else if (result.state === "denied") {
        //   toast.error(
        //     "Location permission denied. Please enable it in browser settings for all features."
        //   );
        }
      })
      .catch((err) => {
        // toast.error(`Error checking permissions: ${err.message}`);
      });
  } else {
    // toast.error("Geolocation is not supported by your browser.");
  }
};
