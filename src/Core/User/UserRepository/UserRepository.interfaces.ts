export interface IUserRepository {
  login(email: string, password: string): Promise<ILoginResponse>;
  logout(): Promise<ILogoutResponse>;
  registration(email: string, password: string, name: string): Promise<IRegistrationResponse>;
}

export type ILoginResponse = {
 token: string
};

export type ILogoutResponse = {
    status: 'ok'
};


export type IRegistrationResponse = {
  status: 'ok'
 };