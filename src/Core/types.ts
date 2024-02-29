import { AnyAction, AsyncThunk, ThunkDispatch } from "@reduxjs/toolkit";
import { UserEntity } from "./User/UserEntity";

export type RootState = ReturnType<typeof UserEntity.reducer>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type Thunk<Args> = AsyncThunk<void, Args, any>;
