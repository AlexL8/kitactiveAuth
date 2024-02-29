import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  withNetworkState,
  withNetworkReducers,
  IWithNetworkState,
} from "../../utils/network";
import { IUserEntityState } from "../UserEntity";
import {
  ILoginResponse,
} from "../UserRepository";

const initialState: IUserEntityState & IWithNetworkState = {
  ...withNetworkState,
  token: null,
};

export const UserEntity = createSlice({
  name: "UserEntity",
  initialState,
  reducers: {
    ...withNetworkReducers,
    setToken(state, action: PayloadAction<ILoginResponse>) {
      console.log(state);
      console.log(action);
      state.token = action.payload.token
    }
  },
});
