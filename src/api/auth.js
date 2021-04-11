//import { apiCall } from "./api";
import axios from "axios";

export const signin = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8081/api/auth/signin",
      data
    );
    if (response.status === 200) {
      return response;
    }

    //console.log(response);
  } catch (error) {
    return error;
    //console.error(error);
  }
};

export const signout = () => {};
