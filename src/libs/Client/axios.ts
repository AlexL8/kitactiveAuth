import { default as axiosLib } from "axios";
import { BASE_URL } from "../../constants/axios";
import {LOCAL_STORAGE_AUTH_TOKEN_KEY} from "../../constants/localStorage";

export const axios = axiosLib.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY)
      if (config && config.headers && token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      Promise.reject(error)
    },
)