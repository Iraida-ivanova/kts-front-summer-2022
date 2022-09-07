import { numberOfItems } from '@utils/numberOfItems';
import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_queryParams';

export default class SetQueryParamsStore {
  private _queryParams: Record<string, string | string[]>;

  constructor(queryParams: Record<string, string | string[]>) {
    this._queryParams = queryParams['offset'] ? queryParams : { offset: '0', number: `${numberOfItems}` };
    makeObservable<SetQueryParamsStore, PrivateFields>(this, {
      _queryParams: observable.ref,
      params: computed,
      setParams: action,
      setAllParams: action,
      deleteParam: action,
    });
  }

  get params(): Record<string, string | string[]> {
    return this._queryParams;
  }

  setParams(key: string, value: string | string[]) {
    this._queryParams[key] = value;
    if (key === 'offset') {
      this._queryParams['number'] = `${+value + numberOfItems}`;
    }
  }

  setAllParams(params: Record<string, string | string[]>): void {
    this._queryParams = { ...params };
  }

  deleteParam(key: string) {
    delete this._queryParams[key];
  }
}
