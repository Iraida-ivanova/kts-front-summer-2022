import { HTTPMethod } from 'projectTypes/enums';
import * as qs from 'qs';

export type RequestParams<ReqT> = {
  method: HTTPMethod;
  endpoint: string;
  headers: Record<string, string>;
  data?: ReqT;
  params: Record<string, string | number | boolean | Array<string> | undefined | qs.ParsedQs | qs.ParsedQs[]>;
};

export type GetDataParams = {
  endpoint: string;
  params: Record<string, string | number | boolean | Array<string> | undefined | qs.ParsedQs | qs.ParsedQs[]>;
};

export enum StatusHTTP {
  Success = 200,
  BadRequest = 400,
  UnExpectedError = 'UnExpectedError',
}

export type ApiResponse<SuccessT, ErrorT> =
  | {
      success: true;
      data: SuccessT;
      status: number | string;
    }
  | {
      success: false;
      data: ErrorT;
      status: number | string;
    }
  | {
      success: false;
      data: Error;
      status: StatusHTTP;
    };

export interface IApiStore {
  readonly baseUrl: string;

  request<SuccessT, ErrorT = Error, ReqT = Record<string, unknown>>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>>;
}
