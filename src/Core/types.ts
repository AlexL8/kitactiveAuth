import { AnyAction, AsyncThunk, Store, ThunkDispatch } from "@reduxjs/toolkit";
import { ServicesEntity } from "Core/Services/ServicesEntity";

export type RootState = ReturnType<typeof ServicesEntity.reducer>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type Thunk<Args> = AsyncThunk<void, Args, any>;
