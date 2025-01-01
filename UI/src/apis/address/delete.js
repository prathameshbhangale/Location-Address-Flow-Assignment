import { apiConnector } from "../axiosInstace";

export const deleteAddress = async (params,token) => {
  try {
    const headers= {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const response = await apiConnector("DELETE", "/address/delete", {}, headers , params);
    return response.data; 
  } catch (error) {
    console.log("Login Error:", error);
  }
};
