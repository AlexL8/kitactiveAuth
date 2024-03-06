export interface IFilesRepository {
  getFiles(): Promise<IGetFilesResponse>;
  getFile(id: string): Promise<Blob>;
  setFiles(files: BlobFiles): Promise<ISetFilesResponse>;
  deleteFile(id: string): Promise<IDeleteFileResponse>;
}
export type BlobFiles = File[]
export type FilesResponse = FileResponse[]


export interface FileResponse {
    id: string,
    name: string,
    fileName: string,
    mimeType: string,
    url: string,
    createdAt: string
}

export type IGetFilesResponse = {
    files: FilesResponse
    status: 'ok'
};

export type ISetFilesResponse = {
    status: 'ok'
};

export type IDeleteFileResponse = {
    status: 'ok'
 };