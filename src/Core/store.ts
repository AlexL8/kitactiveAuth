import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { NavigateFunction } from "react-router/dist/lib/hooks";
import { useNavigate } from "react-router-dom";

import { UserEntity } from "./User/UserEntity";
import {
  IUserInteractor,
  UserInteractor,
} from "./User/UserInteractor";
import {FilesEntity} from "./Files/FilesEntity";
import {FilesInteractor, IFilesInteractor} from "./Files/FilesInteractor";
import {ModalsEntity} from "./UIState/Modals";

export const store = configureStore({
  reducer: {
    UserEntity: UserEntity.reducer,
    FilesEntity: FilesEntity.reducer,
    ModalsEntity: ModalsEntity.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type IStore = ReturnType<typeof store.getState>;

interface IActions {
  User: typeof UserEntity.actions;
  Files: typeof FilesEntity.actions
  Modals: typeof ModalsEntity.actions;
}

export const actions: IActions = {
  User: UserEntity.actions,
  Files: FilesEntity.actions,
  Modals: ModalsEntity.actions
};

interface IAsyncActions {
  User: IUserInteractor;
  Files: IFilesInteractor;
}

type IAsyncActionsFn = (navigate: NavigateFunction) => IAsyncActions;

const asyncActions: IAsyncActionsFn = (navigate: NavigateFunction) => {
  return {
    User: UserInteractor(navigate),
    Files: FilesInteractor(navigate)
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
