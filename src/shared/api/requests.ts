import { tokenInstance } from "@utils/tokenInstance";
import axios, {
  AxiosRequestHeaders,
  CanceledError,
  InternalAxiosRequestConfig,
} from "axios";

const instance = axios.create({
  // baseURL: APPLICATION_URL,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.url === "login") {
      return config;
    } else {
      const token = tokenInstance.getToken();
      config["headers"] = {
        ...config["headers"],
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;

      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof CanceledError) {
      return Promise.reject(error);
    } else if (error.request.status === 401) {
      tokenInstance.clearToken();
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

const get = async (
  url: string,
  params?: Record<string, unknown>,
  signal?: AbortSignal
) => instance.get(url, { params, signal });
const post = async <T>(url: string, body: T) => instance.post(url, body);
const patch = async <T>(url: string, body: T) => instance.patch(url, body);
const put = async <T>(url: string, body: T) => instance.put(url, body);
const del = async (url: string) => instance.delete(url);

export const axiosInstance = instance;
export const request = {
  get,
  post,
  patch,
  put,
  del,
};
