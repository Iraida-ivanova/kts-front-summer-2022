import ApiStore from 'store/RootStore/ApiStore';
import { apiKey } from 'store/RootStore/ApiStore/apiKey';
import QueryParamsStore from 'store/RootStore/QueryParamsStore/QueryParamsStore';

const baseUrl = 'https://api.spoonacular.com';
export default class RootStore {
  private readonly _apiStore: ApiStore = new ApiStore(baseUrl, apiKey);
  private readonly _query: QueryParamsStore = new QueryParamsStore();

  get apiStore() {
    return this._apiStore;
  }

  get query() {
    return this._query;
  }
}
