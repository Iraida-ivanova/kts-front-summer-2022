import { action, computed, makeObservable, observable } from 'mobx';
import * as qs from 'qs';
import { numberOfItems } from 'utils/numberOfItems';

type PrivateFields = '_params' | '_duplicateParams';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {}; //параметры запроса, распарсенные из url
  private _queryString = ''; //qs, распарсенная из url
  private _duplicateParams: Record<string, string | string[]> = { offset: '0', number: `${numberOfItems}` };

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      _duplicateParams: observable,
      params: computed,
      queryString: computed,
      duplicateParams: computed,
      setQueryString: action,
      setDuplicateParam: action,
      setDuplicateParams: action,
      deleteDuplicateParam: action,
    });
  }

  get queryString() {
    return this._queryString;
  }

  get params(): qs.ParsedQs {
    return this._params;
  }

  get duplicateParams(): Record<string, string | string[]> {
    return this._duplicateParams;
  }

  getParam(key: string): string | string[] | qs.ParsedQs | qs.ParsedQs[] | undefined {
    return this._params[key];
  }

  getDuplicateParam(key: string): string | string[] | qs.ParsedQs | qs.ParsedQs[] | undefined {
    return this._duplicateParams[key];
  }

  setQueryString(queryString: string): void {
    queryString = queryString.startsWith('?') ? queryString.slice(1) : queryString;
    if (this._queryString !== queryString) {
      this._queryString = queryString;
      this._params = qs.parse(queryString);
    }
  }

  setDuplicateParam(key: string, value: string | string[]) {
    this._duplicateParams[key] = value;
    if (key === 'offset') {
      this._duplicateParams['number'] = `${+value + numberOfItems}`;
    }
  }

  setDuplicateParams(params: Record<string, string | string[]>): void {
    this._duplicateParams = { ...params };
  }

  deleteDuplicateParam(key: string) {
    delete this._duplicateParams[key];
  }
}
