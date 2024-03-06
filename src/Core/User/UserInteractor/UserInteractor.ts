import { createAsyncThunk } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router/dist/lib/hooks";

import { Thunk } from "../../types";
import { UserEntity } from "../UserEntity";
import {
  UserRepository,
  IUserRepository
} from "../UserRepository";
import { PAGES_CONFIG } from "../../../constants/pages";
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from "../../../constants/localStorage";
import {INotification, Notification} from "../../../libs/Notification/Notification";

export interface IUserInteractor {
  login: Thunk<{ email: string; password: string }>;
  logout: Thunk<void>;
  registration:  Thunk<{ email: string; password: string; name: string }>;
}

export const createUserInteractor = (
  Repository: IUserRepository,
  Entity: typeof UserEntity,
  Navigation: NavigateFunction,
  Storage: Storage,
  Notification: INotification
): IUserInteractor => ({
    login: createAsyncThunk(
        "UserInteractor/login",
        async ({ email, password }, { dispatch }) => {
            try {
                dispatch(Entity.actions.setLoading(true));
                const userLoginResponse = await Repository.login(email, password);
                if (userLoginResponse.token) {
                    Storage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, userLoginResponse.token)
                    dispatch(Entity.actions.setToken(userLoginResponse));
                    Navigation(PAGES_CONFIG.main.route)
                }
            } catch (err: unknown) {
                throw new Error("Ошибка логина");
            } finally {
                dispatch(Entity.actions.setLoading(false));
            }
        },
    ),
    logout: createAsyncThunk(
        "UserInteractor/login",
        async (_, { dispatch }) => {
            try {
                dispatch(Entity.actions.setLoading(true));
                const userLoginResponse = await Repository.logout();
                if (userLoginResponse.status === 'ok') {
                    Storage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY)
                    dispatch(Entity.actions.removeToken());
                    Navigation(PAGES_CONFIG.login.route)
                }
            } catch (err: unknown) {
                throw new Error("Ошибка логина");
            } finally {
                dispatch(Entity.actions.setLoading(false));
            }
        },
    ),
    registration: createAsyncThunk(
        "UserInteractor/login",
        async ({ email, password, name }, { dispatch }) => {
            try {
                dispatch(Entity.actions.setLoading(true));
                const response = await Repository.registration(email, password, name);
                if (response.status === 'ok') {
                    Notification.success('Account created')
                    Navigation(PAGES_CONFIG.login.route)
                }
            } catch (err) {
                Notification.error('This account has already been created')
                throw new Error("Ошибка регистрации");
            } finally {
                dispatch(Entity.actions.setLoading(false));
            }
        },
    ),
});

export const UserInteractor = (Navigation: NavigateFunction) =>
    createUserInteractor(UserRepository, UserEntity, Navigation, localStorage, Notification);
