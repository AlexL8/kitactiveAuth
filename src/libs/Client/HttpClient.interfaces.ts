type ResponseType =
  | "arraybuffer"
  | "blob"
  | "document"
  | "json"
  | "text"
  | "stream";

type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

interface IHttpClientConfig {
  url?: string;
  method?: Method;
  baseURL?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paramsSerializer?: (params: any) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  timeout?: number;
  timeoutErrorMessage?: string;
  withCredentials?: boolean;
  responseType?: ResponseType;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  maxContentLength?: number;
  validateStatus?: ((status: number) => boolean) | null;
  maxBodyLength?: number;
  maxRedirects?: number;
  socketPath?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  httpAgent?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  httpsAgent?: any;
  decompress?: boolean;
  signal?: AbortSignal;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IHttpClientResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: any;
  config: IHttpClientConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request?: any;
}

export interface IHttpClient {
  get<T = any, R = IHttpClientResponse<T>>(
    url: string,
    config?: IHttpClientConfig,
  ): Promise<R>;

  post<T = any, R = IHttpClientResponse<T>>(
    url: string,
    data?: any,
    config?: IHttpClientConfig,
  ): Promise<R>;

  put<T = any, R = IHttpClientResponse<T>>(
    url: string,
    data?: any,
    config?: IHttpClientConfig,
  ): Promise<R>;

  patch<T = any, R = IHttpClientResponse<T>>(
    url: string,
    data?: any,
    config?: IHttpClientConfig,
  ): Promise<R>;

  delete<T = any, R = IHttpClientResponse<T>>(
    url: string,
    config?: IHttpClientConfig,
  ): Promise<R>;
}
