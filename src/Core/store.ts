import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { NavigateFunction } from "react-router/dist/lib/hooks";
import { useNavigate } from "react-router-dom";

import { UserEntity } from "./User/UserEntity";
import {
  IUserInteractor,
  UserInteractor,
} from "./User/UserInteractor";

export const store = configureStore({
  reducer: {
    UserEntity: UserEntity.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type IStore = ReturnType<typeof store.getState>;

interface IActions {
  User: typeof UserEntity.actions;
}

export const actions: IActions = {
  User: UserEntity.actions,
};

interface IAsyncActions {
  User: IUserInteractor;
}

type IAsyncActionsFn = (navigate: NavigateFunction) => IAsyncActions;

const asyncActions: IAsyncActionsFn = (navigate: NavigateFunction) => {
  return {
    User: UserInteractor(navigate),
  };
};

export const useStore = <T>(
  selector: (store: IStore) => T,
): { store: T; actions: IActions; asyncActions: IAsyncActions } => {
  const navigation = useNavigate();
  return {
    actions,
    store: useSelector(selector),
    asyncActions: asyncActions(navigation),
  };
};
