import { HTTPMethod } from '@projectTypes/enums';
import axios from 'axios';

import { ApiResponse, IApiStore, RequestParams, StatusHTTP } from './types';

export default class ApiStore implements IApiStore {
  readonly baseUrl: string;
  readonly apiKey?: string;
  constructor(baseUrl: string, apiKey?: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async request<SuccessT, ErrorT = any, ReqT = {}>(
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
      let response = await axios(config);

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
}