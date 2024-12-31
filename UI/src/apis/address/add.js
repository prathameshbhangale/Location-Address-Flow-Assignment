import { apiConnector } from "../axiosInstace";

// {
//     "latitude": 40.7128,
//     "longitude": -74.0060,
//     "street": "123 Main St",
//     "address": "Apt 4B",
//     "category": "Home",
//     "houseNumber":"djkhnskjnc",
//     "isFavorite": true
//   }
  
  

export const addAddress = async (body,token) => {
  try {
    const headers= {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const response = await apiConnector("POST", "/address/add", body, headers );
    return response.data; // Return the response data
  } catch (error) {
    console.log("Login Error:", error);
  }
};
