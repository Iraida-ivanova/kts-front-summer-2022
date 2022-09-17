import axios from 'axios';
import { HTTPMethod } from 'projectTypes/enums';

import { ApiResponse, GetDataParams, IApiStore, RequestParams, StatusHTTP } from './types';

export default class ApiStore implements IApiStore {
  readonly baseUrl: string;
  readonly apiKey?: string;

  constructor(baseUrl: string, apiKey?: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async request<SuccessT, ErrorT = Error, ReqT = Record<string, unknown>>(
    requestParams: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>> {
    let config = {};
    if (requestParams.method === HTTPMethod.GET) {
      config = {
        method: requestParams.method,
        baseURL: this.baseUrl,
        url: requestParams.endpoint,
        params: { apiKey: this.apiKey, ...requestParams.params },
      };
    } else {
      config = {
        method: requestParams.method,
        headers: {
          ...requestParams.headers,
          'Content-Type': 'application/json;charset=utf-8',
        },
        baseURL: this.baseUrl,
        url: requestParams.endpoint,
        data: JSON.stringify(requestParams.data),
        params: { apiKey: this.apiKey, ...requestParams.params },
      };
    }

    try {
      const response = await axios(config);

      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
          status: response.status,
        };
      } else {
        return {
          success: false,
          data: await response.data,
          status: response.status,
        };
      }
    } catch (error) {
      return {
        success: false,
        data: error as Error,
        status: StatusHTTP.UnExpectedError,
      };
    }
  }

  async getData<SuccessT, ErrorT = Error>(params: GetDataParams): Promise<ApiResponse<SuccessT, ErrorT>> {
    return await this.request<SuccessT, ErrorT>({
      method: HTTPMethod.GET,
      headers: {},
      data: {},
      ...params,
    });
  }
}
