import { PayloadAction } from "@reduxjs/toolkit";

export interface IWithNetworkState {
  isLoading: boolean;
  isSubmitLoading: boolean;
}
// ToDO общее поведение которое переиспользуется будем хранить тут (пр. isLoading - будем показываться спинер при загрузках)
export const withNetworkState: IWithNetworkState = {
  isLoading: false,
  isSubmitLoading: false,
};

export const withNetworkReducers = {
  setLoading(state: IWithNetworkState, action: PayloadAction<boolean>): void {
    state.isLoading = action.payload;
  },
  setSubmitLoading(
    state: IWithNetworkState,
    action: PayloadAction<boolean>,
  ): void {
    state.isSubmitLoading = action.payload;
  }
};
