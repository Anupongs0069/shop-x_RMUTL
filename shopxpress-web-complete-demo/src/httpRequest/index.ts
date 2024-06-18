import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import qs from 'qs';
import authHelper from '../helpers/authHelper';

export interface IAppErrorResponse {
  message: string;
  status: number;
  additionValue: any;
  errorType: string;
}

const BASE_API = process.env.REACT_APP_BASE_API ?? '';
// eslint-disable-next-line
const excludeUrls = [];
export class HttpRequest {
  axiosInstance: AxiosInstance;
  baseApi: string;
  companyId: string | undefined;

  constructor() {
    this.baseApi = BASE_API;
    this.axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json'
      },
      paramsSerializer: (params) => {
        return qs.stringify(params);
      }
    });

    this.axiosInstance.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        const apiToken = authHelper.token;
        // Attach token for the request.
        if (request.headers && apiToken) {
          request.headers['Authorization'] = 'Bearer ' + apiToken;
        }
        return request;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        return response;
      },
      async (error: AxiosError<IAppErrorResponse>) => {
        if (error.response?.status === 401) {
          // Remove token and redirect to login.
          console.log('Token is invalid or expired');
          authHelper.removeAuth();
          // window.location.href = '/login';
        } else if (error.response?.status === 204) {
        }

        return Promise.reject(error.response?.data);
      }
    );
  }

  get<Type>(controllerName: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.get<Type>(`${this.baseApi}/${controllerName}`, config);
  }

  post<Type>(controllerName: string, data?: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.post<Type>(`${this.baseApi}/${controllerName}`, data, config);
  }

  put<Type>(controllerName: string, data?: any, config?: AxiosRequestConfig) {
    return this.axiosInstance.put<Type>(`${this.baseApi}/${controllerName}`, data, config);
  }

  delete<Type>(controllerName: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.delete<Type>(`${this.baseApi}/${controllerName}`, config);
  }
}

const httpRequest = new HttpRequest();
export default httpRequest;
