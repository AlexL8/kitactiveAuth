import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_MODAL_PROPS } from "./ModalEntity.constants";
import { IModalProps, IModalsEntityState } from "./ModalsEntity.interfaces";

const initialState: IModalsEntityState = {
  openedModal: "",
  modalProps: DEFAULT_MODAL_PROPS,
};

export const ModalsEntity = createSlice({
  name: "ModalsEntity",
  initialState,
  reducers: {
    open(
      state,
      action: PayloadAction<{ modalName: string; props?: IModalProps }>,
    ) {
      state.openedModal = action.payload.modalName;
      state.modalProps = { ...DEFAULT_MODAL_PROPS, ...action.payload.props };
    },
    close(state) {
      state.openedModal = "";
      state.modalProps = DEFAULT_MODAL_PROPS;
    },
  },
});
