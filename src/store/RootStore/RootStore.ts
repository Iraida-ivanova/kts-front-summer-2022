import ApiStore from '@store/RootStore/ApiStore';
import { apiKey } from '@store/RootStore/ApiStore/apiKey';
import QueryParamsStore from '@store/RootStore/QueryParamsStore/QueryParamsStore';
import SetQueryParamsStore from '@store/RootStore/SetQueryParamsStore';

const baseUrl = 'https://api.spoonacular.com';
export default class RootStore {
  private readonly _apiStore: ApiStore = new ApiStore(baseUrl, apiKey);
  private readonly _query: QueryParamsStore = new QueryParamsStore();
  private readonly _queryParams: SetQueryParamsStore = new SetQueryParamsStore(
    this._query.params as Record<string, string | string[]>
  );

  get apiStore() {
    return this._apiStore;
  }

  get query() {
    return this._query;
  }

  get queryParams() {
    return this._queryParams;
  }
}
