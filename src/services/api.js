import axios from "axios";

const domain =
  process.env.REACT_APP_API || "https://61a5e3c48395690017be8ed2.mockapi.io";
export const callAPI = async (path, method, data = {}) => {
  try {
    if (method === "GET") {
      const response = await axios.get(domain + path);
      if (response.status === 200) {
        return response.data;
      }
    } else if (method === "POST") {
    }
    return;
  } catch (error) {
    console.error(error);
  }
};
