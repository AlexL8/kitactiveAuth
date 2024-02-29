export interface IUserRepository {
  login(email: string, password: string): Promise<ILoginResponse>;
  registration(email: string, password: string, name: string): Promise<void>;
}

export type ILoginResponse = {
 token: string
};