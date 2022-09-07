import { HTTPMethod, Meta } from '@projectTypes/enums';
import { RecipeItemModel } from '@store/models/Food/RecipeItem';
import { normalizeRecipesData, RecipesDataApi } from '@store/models/Food/RecipesData';
import MultiDropdownStore from '@store/MultiDropdownStore';
import rootStore from '@store/RootStore';
import { numberOfItems } from '@utils/numberOfItems';
import { ILocalStore } from '@utils/UseLocalStore';
import { getTypes } from '@utils/utils';
import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';

import { IRecipeListStore } from './types';

type PrivateFields = '_list' | '_meta' | '_hasMore';

export default class RecipeListStore implements IRecipeListStore, ILocalStore {
  private _list: RecipeItemModel[] = [];
  private _meta: Meta = Meta.initial;
  private _hasMore: boolean = true;
  private _multiDropdown: MultiDropdownStore = new MultiDropdownStore();

  constructor() {
    makeObservable<RecipeListStore, PrivateFields>(this, {
      _meta: observable,
      _list: observable.ref,
      _hasMore: observable,
      meta: computed,
      list: computed,
      hasMore: computed,
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

  get multiDropdown(): MultiDropdownStore {
    return this._multiDropdown;
  }

  get hasMore(): boolean {
    return this._hasMore;
  }

  getRecipeList = async (number?: number): Promise<void> => {
    const offset = rootStore.query.getParam('offset') as string;
    this._meta = Meta.loading;
    try {
      const result = await rootStore.apiStore.request<RecipesDataApi>({
        method: HTTPMethod.GET,
        headers: {},
        data: {},
        endpoint: '/recipes/complexSearch',
        params: {
          type: getTypes(this._multiDropdown.selectedValues),
          addRecipeNutrition: true,
          number: number ? number + numberOfItems : numberOfItems,
          offset: offset,
          query: rootStore.query.getParam('search'),
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
            if (+offset > 0) {
              this._list = [...this._list, ...data.results];
            } else {
              this._list = [];
              this._list = data.results;
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

  private readonly _queryStringReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('offset') || rootStore.query.getParam('search'),
    async (curValue) => {
      await this.getRecipeList();
    }
  );

  private readonly _selectValueReaction: IReactionDisposer = reaction(
    () => this.multiDropdown.selectedValues,
    async (curValue) => {
      await this.getRecipeList();
    }
  );

  destroy(): void {
    this._meta = Meta.initial;
    this._list = [];
    this._hasMore = true;
    this._queryStringReaction();
    this._selectValueReaction();
  }
}
