import {
  IUserRepository,
  ILoginResponse,
  IRegistrationResponse
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
  logout: async () => {
  const userResponse = await Client.post<IRegistrationResponse>(`/api/logout`, {
  });
   return userResponse.data;
 },
  registration: async (email, password, name) => {
    const userResponse = await Client.post<IRegistrationResponse>(`/api/register`, {
      email,
      password,
      name
    });
    return userResponse.data;
  },
};
