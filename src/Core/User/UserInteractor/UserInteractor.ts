import { createAsyncThunk } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router/dist/lib/hooks";

import { Thunk } from "../../types";
import { UserEntity } from "../UserEntity";
import {
  UserRepository,
  IUserRepository
} from "../UserRepository";

export interface IUserInteractor {
  login: Thunk<{ email: string; password: string }>;
  registration:  Thunk<{ email: string; password: string; name: string }>;
}

export const createUserInteractor = (
  Repository: IUserRepository,
  Entity: typeof UserEntity,
  Navigation: NavigateFunction,
): IUserInteractor => ({
    login: createAsyncThunk(
        "UserInteractor/login",
        async ({ email, password }, { dispatch }) => {
            try {
                dispatch(Entity.actions.setLoading(true));
                const userLoginResponse = await Repository.login(email, password);
                dispatch(Entity.actions.setToken(userLoginResponse));
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
                await Repository.registration(email, password, name);
            } catch (err) {
                throw new Error("Ошибка регистрации");
            } finally {
                dispatch(Entity.actions.setLoading(false));
            }
        },
    ),
});

export const UserInteractor = (Navigation: NavigateFunction) =>
    createUserInteractor(UserRepository, UserEntity, Navigation);
