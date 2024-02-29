import {
  IUserRepository,
  ILoginResponse
} from "../UserRepository";
import { Client } from "../../../libs/Client";

export const UserRepository: IUserRepository = {
  login: async (email, password) => {
    const userResponse = await Client.post<ILoginResponse>("/api/login", {
      email,
      password
    });
    return userResponse.data;
  },
  registration: async (email, password, name) => {
    const userResponse = await Client.post<void>(`/api/register`, {
      email,
      password,
      name
    });
    return userResponse.data;
  },
};
