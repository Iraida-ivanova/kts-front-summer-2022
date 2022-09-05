import { HTTPMethod, Meta } from '@projectTypes/enums';
import { RecipeItemModel } from '@store/models/Food/RecipeItem';
import { normalizeRecipesData, RecipesDataApi } from '@store/models/Food/RecipesData';
import rootStore from '@store/RootStore';
import SelectedValuesStore from '@store/SelectedValuesStore';
import { ILocalStore } from '@utils/UseLocalStore';
import { getTypes } from '@utils/utils';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { IRecipeListStore } from './types';

type PrivateFields = '_list' | '_meta' | '_offset' | '_selectedValues' | '_hasMore';

export default class RecipeListStore implements IRecipeListStore, ILocalStore {
  private _list: RecipeItemModel[] = [];
  private _meta: Meta = Meta.initial;
  private _hasMore: boolean = true;
  private _selectedValues: SelectedValuesStore = new SelectedValuesStore();
  private _offset: number = 0;

  constructor() {
    makeObservable<RecipeListStore, PrivateFields>(this, {
      _meta: observable,
      _list: observable.ref,
      _offset: observable,
      _selectedValues: observable.ref,
      _hasMore: observable,
      meta: computed,
      list: computed,
      selectedValues: computed,
      hasMore: computed,
      offset: computed,
      setOffset: action,
      getRecipeList: action,
      destroy: action,
    });
  }

  get list(): RecipeItemModel[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  get selectedValues(): SelectedValuesStore {
    return this._selectedValues;
  }

  get hasMore(): boolean {
    return this._hasMore;
  }

  get offset(): number {
    return this._offset;
  }

  setOffset(value: number): void {
    this._offset = value;
  }

  getRecipeList = async (): Promise<void> => {
    const numberOfItems = 9;
    this._meta = Meta.loading;
    try {
      const result = await rootStore.apiStore.request<RecipesDataApi>({
        method: HTTPMethod.GET,
        headers: {},
        data: {},
        endpoint: '/recipes/complexSearch',
        params: {
          type: getTypes(this._selectedValues.values),
          addRecipeNutrition: true,
          number: numberOfItems,
          offset: this._offset,
        },
      });
      runInAction(() => {
        if (result.success) {
          if (this._list.length >= result.data.totalResults) {
            this._hasMore = false;
            return;
          }
          try {
            this._meta = Meta.success;
            const data = normalizeRecipesData(result.data);
            if (this._offset > 0) {
              this._list = [...this._list, ...data.results];
              this._offset = this._list.length;
            } else {
              this._list = [];
              this._list = data.results;
              this._offset = this._list.length;
            }
            return;
          } catch (e) {
            this._list = [];
            this._meta = Meta.error;
          }
        }
        this._meta = Meta.error;
      });
    } catch (e) {
      this._meta = Meta.error;
    }
  };

  destroy(): void {
    this._meta = Meta.initial;
    this._list = [];
    this._offset = 0;
    this._hasMore = true;
  }
}
