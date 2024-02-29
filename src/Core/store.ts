import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { NavigateFunction } from "react-router/dist/lib/hooks";
import { useNavigate } from "react-router-dom";

import { ServicesEntity } from "core/Services/ServicesEntity";
import {
  IServicesInteractor,
  ServicesInteractor,
} from "core/Services/ServicesInteractor";

export const store = configureStore({
  reducer: {
    ServicesEntity: ServicesEntity.reducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({})],
});

export type IStore = ReturnType<typeof store.getState>;

interface IActions {
  Services: typeof ServicesEntity.actions;
}

export const actions: IActions = {
  Services: ServicesEntity.actions,
};

interface IAsyncActions {
  Services: IServicesInteractor;
}

type IAsyncActionsFn = (navigate: NavigateFunction) => IAsyncActions;

const asyncActions: IAsyncActionsFn = (navigate: NavigateFunction) => {
  return {
    Services: ServicesInteractor(navigate),
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

useStore((store) => ({
  services: ServicesEntity,
  ac: store.ServicesEntity
}))
