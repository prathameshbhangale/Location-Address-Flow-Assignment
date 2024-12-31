import { toast } from "react-hot-toast";
import { setCoordinates, setPermission } from "../slices/locationSlice"; 

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
                dispatch(setPermission(true))
                toast.success("Location set as current location");
            },
            (err) => {
              toast.error(`Failed set Location set as curremt location ${err.message}`);
            }
          );
        } else if (result.state === "denied") {
          toast.error(
            "Location permission denied."
          );
        }
      })
      .catch((err) => {
        // toast.error(`Error checking permissions: ${err.message}`);
      });
  } else {
    // toast.error("Geolocation is not supported by your browser.");
  }
};
