import { DataProvider } from "react-admin";
import axios from "axios";
import type {
  AxiosError,
  AxiosInterceptorOptions,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";

export const dataProvider = (
  endpoint: string,
  options?: {
    resourceToModelMap?: Record<string, string>;
    axiosInterceptors?: {
      response?: {
        onFulfilled?: (value: AxiosResponse<any, any>) => any;
        onRejected?: (error: any) => any;
        options?: AxiosInterceptorOptions;
      }[];
      request?: {
        onFulfilled?: (
          value: AxiosRequestConfig<any>
        ) => AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>>;
        onRejected?: (error: any) => any;
        options?: AxiosInterceptorOptions;
      }[];
    };
  }
): DataProvider => {
  const apiService = axios.create({
    baseURL: endpoint,
  });

  apiService.interceptors.response.use((res) => res.data);

  if (options && options.axiosInterceptors) {
    if (options.axiosInterceptors.request)
      options.axiosInterceptors.request.forEach((value) =>
        apiService.interceptors.request.use(
          value.onFulfilled,
          value.onRejected,
          value.options
        )
      );

    if (options.axiosInterceptors.response)
      options.axiosInterceptors.response.forEach((value) =>
        apiService.interceptors.response.use(
          value.onFulfilled,
          value.onRejected,
          value.options
        )
      );
  }

  return {
    getList: (resource, params) => {
      return apiService
        .post(resource, {
          method: "getList",
          resource,
          params,
          model: options?.resourceToModelMap?.[resource] ?? undefined,
        })
        .catch(reactAdminAxiosErrorHandler);
    },
    getOne: (resource, params) => {
      return apiService
        .post(resource, {
          method: "getOne",
          resource,
          params,
          model: options?.resourceToModelMap?.[resource] ?? undefined,
        })
        .catch(reactAdminAxiosErrorHandler);
    },
    getMany: (resource, params) => {
      return apiService
        .post(resource, {
          method: "getMany",
          resource,
          params,
          model: options?.resourceToModelMap?.[resource] ?? undefined,
        })
        .catch(reactAdminAxiosErrorHandler);
    },
    getManyReference: (resource, params) => {
      return apiService
        .post(resource, {
          method: "getManyReference",
          resource,
          params,
          model: options?.resourceToModelMap?.[resource] ?? undefined,
        })
        .catch(reactAdminAxiosErrorHandler);
    },
    create: (resource, params) => {
      return apiService
        .post(resource, {
          method: "create",
          resource,
          params,
          model: options?.resourceToModelMap?.[resource] ?? undefined,
        })
        .catch(reactAdminAxiosErrorHandler);
    },
    update: (resource, params) => {
      return apiService
        .post(resource, {
          method: "update",
          resource,
          params,
          model: options?.resourceToModelMap?.[resource] ?? undefined,
        })
        .catch(reactAdminAxiosErrorHandler);
    },
    updateMany: (resource, params) => {
      return apiService
        .post(resource, {
          method: "updateMany",
          resource,
          params,
          model: options?.resourceToModelMap?.[resource] ?? undefined,
        })
        .catch(reactAdminAxiosErrorHandler);
    },
    delete: (resource, params) => {
      return apiService
        .post(resource, {
          method: "delete",
          resource,
          params,
          model: options?.resourceToModelMap?.[resource] ?? undefined,
        })
        .catch(reactAdminAxiosErrorHandler);
    },
    deleteMany: (resource, params) => {
      return apiService
        .post(resource, {
          method: "deleteMany",
          resource,
          params,
          model: options?.resourceToModelMap?.[resource] ?? undefined,
        })
        .catch(reactAdminAxiosErrorHandler);
    },
  };
};

// react-admin expects the error to be thrown
// https://marmelab.com/admin-on-rest/RestClients.html#writing-your-own-rest-client
const reactAdminAxiosErrorHandler = (error: AxiosError) => {
  throw error.response.data;
};
