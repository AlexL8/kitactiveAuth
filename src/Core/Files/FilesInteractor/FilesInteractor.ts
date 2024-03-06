import { createAsyncThunk } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router/dist/lib/hooks";

import { Thunk } from "../../types";
import { FilesEntity } from "../FilesEntity";
import {
    BlobFiles,
    FilesRepository,
    IFilesRepository
} from "../FilesRepository";
import {INotification, Notification} from "../../../libs/Notification/Notification";
import {IStore} from "../../store";

export interface IFilesInteractor {
  getFiles: Thunk<void>;
  uploadFiles: Thunk<{ files: BlobFiles }>;
  deleteFile:  Thunk<{ id: string }>;
  getFile:  Thunk<{ id: string }>;
}

export const createFilesInteractor = (
  Repository: IFilesRepository,
  Entity: typeof FilesEntity,
  Navigation: NavigateFunction,
  Notification: INotification
): IFilesInteractor => ({
    getFiles: createAsyncThunk(
        "FilesInteractor/getFiles",
        async (_, { dispatch }) => {
            try {
                dispatch(Entity.actions.setLoading(true));
                const filesResponse = await Repository.getFiles();

                if (filesResponse.files) {
                    dispatch(Entity.actions.setFiles(filesResponse.files))
                }
            } catch (err: unknown) {
                throw new Error("Ошибка логина");
            } finally {
                dispatch(Entity.actions.setLoading(false));
            }
        },
    ),
    uploadFiles: createAsyncThunk(
        "FilesInteractor/uploadFiles",
        async ({ files }, { dispatch, getState }) => {
            try {
                dispatch(Entity.actions.setLoading(true));
                const filesResponse = await Repository.setFiles(files);
                if (filesResponse.status === 'ok') {
                    Notification.success('Files upload')
                    const state = getState() as IStore;
                    state.ModalsEntity.modalProps.onCancel && state.ModalsEntity.modalProps.onCancel()
                }
            } catch (err: unknown) {
                Notification.error('Error upload')
                throw new Error("Ошибка логина");
            } finally {
                dispatch(Entity.actions.setLoading(false));
            }
        },
    ),
    deleteFile: createAsyncThunk(
        "FilesInteractor/deleteFile",
        async ({ id }, { dispatch }) => {
            try {
                dispatch(Entity.actions.setLoading(true));
                const response = await Repository.deleteFile(id);
                if (response.status === 'ok') {
                    Notification.success('File is deleted')
                }
            } catch (err) {
                Notification.error('Error delete')
                throw new Error("Ошибка регистрации");
            } finally {
                dispatch(Entity.actions.setLoading(false));
            }
        },
    ),
    getFile: createAsyncThunk(
        "FilesInteractor/deleteFile",
        async ({ id }, { dispatch }) => {
            try {
                dispatch(Entity.actions.setLoading(true));
                const response = await Repository.getFile(id);
                if (!!response) {
                    Notification.success('File is received')
                    dispatch(Entity.actions.setFile(response))
                }
            } catch (err) {
                Notification.error('Error get file')
                throw new Error("Ошибка регистрации");
            } finally {
                dispatch(Entity.actions.setLoading(false));
            }
        },
    ),
});

export const FilesInteractor = (Navigation: NavigateFunction) =>
    createFilesInteractor(FilesRepository, FilesEntity, Navigation, Notification);
