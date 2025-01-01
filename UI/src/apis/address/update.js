import { apiConnector } from "../axiosInstace";

export const updateAddress = async (body,params,token) => {
  try {
    const headers= {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    const response = await apiConnector("POST", "/address/update", body, headers , params);
    return response.data; 
  } catch (error) {
    console.log("update address Error:", error);
  }
};
