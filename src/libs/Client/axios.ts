import { default as axiosLib } from "axios";
import { BASE_URL } from "constants/axiosUrls";

export const axios = axiosLib.create({
  baseURL: BASE_URL,
  withCredentials: false,
});
