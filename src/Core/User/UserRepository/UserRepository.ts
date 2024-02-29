import {
  IUserRepository,
  ILoginResponse
} from "../UserRepository";
import { Client } from "../../../libs/Client";

export const UserRepository: IUserRepository = {
  login: async (email, password) => {
    const servicesResponse = await Client.post<ILoginResponse>("/api/login", {
      email,
      password
    });
    return servicesResponse.data;
  },
  registration: async (email, password, name) => {
    const serviceResponse = await Client.post<void>(`/api/register`, {
      email,
      password,
      name
    });
    return serviceResponse.data;
  },
};
