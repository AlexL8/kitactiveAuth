import {LOCAL_STORAGE_AUTH_TOKEN_KEY} from "../constants/localStorage";

export const getAuthToken = () => localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);