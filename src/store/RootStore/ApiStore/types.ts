import { HTTPMethod } from '@projectTypes/enums';

export type RequestParams<ReqT> = {
  method: HTTPMethod;
  endpoint: string;
  headers: Record<string, string>;
  data?: ReqT;
  params: Record<string, string | number | boolean | Array<string>>;
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
  request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>>;
}
