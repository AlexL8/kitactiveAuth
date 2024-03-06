import {
    IFilesRepository,
    IDeleteFileResponse,
    IGetFilesResponse,
    ISetFilesResponse, FileResponse
} from "../FilesRepository";
import { Client } from "../../../libs/Client";

export const FilesRepository: IFilesRepository = {
  getFiles: async () => {
    const userResponse = await Client.get<IGetFilesResponse>("/api/media");
    return userResponse.data;
  },
  setFiles: async (files) => {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
          formData.append('files[]', files[i]);
      }
      const userResponse = await Client.post<ISetFilesResponse>(`/api/media/upload`, formData);
      return userResponse.data;
 },
  getFile: async (id) => {
    const userResponse = await Client.get<Blob>(`/api/media/${id}`);
    return userResponse.data;
  },
  deleteFile: async (id) => {
    const userResponse = await Client.delete<IDeleteFileResponse>(`/api/media/${id}`);
    return userResponse.data;
  },
};
