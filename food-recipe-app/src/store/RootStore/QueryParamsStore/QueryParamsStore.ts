import { action, makeObservable, observable } from 'mobx';
import * as qs from 'qs';

type PrivateFields = '_params';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _queryString: string = '';

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setQueryString: action,
    });
  }
  setQueryString(queryString: string): void {
    queryString = queryString.startsWith('?') ? queryString.slice(1) : queryString;
    if (this._queryString !== queryString) {
      this._queryString = queryString;
      this._params = qs.parse(queryString);
    }
  }
  geParam(key: string): string | string[] | qs.ParsedQs | qs.ParsedQs[] | undefined {
    return this._params[key];
  }
}
