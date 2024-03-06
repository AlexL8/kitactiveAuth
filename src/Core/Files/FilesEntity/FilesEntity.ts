import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  withNetworkState,
  withNetworkReducers,
  IWithNetworkState,
} from "../../utils/network";
import { IFilesEntityState } from "../FilesEntity";
import {
  FileResponse,
  FilesResponse
} from "../FilesRepository";

const initialState: IFilesEntityState & IWithNetworkState = {
  ...withNetworkState,
  files: [],
  file: null
};

export const FilesEntity = createSlice({
  name: "FilesEntity",
  initialState,
  reducers: {
    ...withNetworkReducers,
    setFiles(state, action: PayloadAction<FilesResponse>) {
      state.files = action.payload
    },
    setFile(state, action: PayloadAction<Blob>) {
      state.file = action.payload
    },
    removeFiles(state) {
      state.files = []
    }
  },
});
