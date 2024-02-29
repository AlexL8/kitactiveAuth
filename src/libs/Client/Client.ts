import { axios } from "./axios";
import { IHttpClient } from "./HttpClient.interfaces";

export const Client: IHttpClient = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
