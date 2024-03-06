import { AnyAction, AsyncThunk, ThunkDispatch } from "@reduxjs/toolkit";
import { UserEntity } from "./User/UserEntity";
import {AsyncThunkConfig} from "@reduxjs/toolkit/src/createAsyncThunk";

export type RootState = ReturnType<typeof UserEntity.reducer>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type Thunk<Args> = AsyncThunk<any, Args, any>;
