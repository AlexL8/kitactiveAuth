import {LOCAL_STORAGE_AUTH_TOKEN_KEY} from "../constants/localStorage";
import {Storage} from "../libs/Storage";

export const getAuthToken = () => localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);