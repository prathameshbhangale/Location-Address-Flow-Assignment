import { apiConnector } from "../axiosInstace";
  

export const getAddress = async (body,token) => {
  try {
    const headers= {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const response = await apiConnector("POST", "/address", body, headers );
    return response.data; // Return the response data
  } catch (error) {
    console.log("Login Error:", error);
  }
};
