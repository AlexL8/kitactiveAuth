import {FileResponse, FilesResponse} from "../FilesRepository";

export interface IFilesEntityState {
  files: FilesResponse
  file: Blob | null
}
