import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';
import { Meta } from 'projectTypes/enums';
import { RecipeItemModel } from 'store/models/Food/recipeItem';
import { normalizeRecipesData, RecipesDataApi } from 'store/models/Food/recipesData';
import MultiDropdownStore from 'store/MultiDropdownStore';
import rootStore from 'store/RootStore';
import { numberOfItems } from 'utils/numberOfItems';
import { ILocalStore } from 'utils/useLocalStore';
import { getTypes } from 'utils/utils';

import { IRecipeListStore } from './types';

type PrivateFields = '_list' | '_meta' | '_hasMore';

export default class RecipeListStore implements IRecipeListStore, ILocalStore {
  private _list: RecipeItemModel[] = [];
  private _meta: Meta = Meta.initial;
  private _hasMore = true;
  private _multiDropdownStore: MultiDropdownStore = new MultiDropdownStore();

  constructor() {
    makeObservable<RecipeListStore, PrivateFields>(this, {
      _meta: observable,
      _list: observable.ref,
      _hasMore: observable,
      meta: computed,
      list: computed,
      loading: computed,
      hasMore: computed,
      hasError: computed,
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

  get multiDropdownStore(): MultiDropdownStore {
    return this._multiDropdownStore;
  }

  get hasMore(): boolean {
    return this._hasMore;
  }

  get loading(): boolean {
    return this._meta === Meta.loading;
  }

  get hasError(): boolean {
    return this._meta === Meta.error;
  }

  getRecipeList = async (number?: number): Promise<void> => {
    this._hasMore = true;
    const offset = number ? '0' : `${this._list.length}`;
    this._meta = Meta.loading;
    try {
      const result = await rootStore.apiStore.getData<RecipesDataApi>({
        endpoint: '/recipes/complexSearch',
        params: {
          type: getTypes(this._multiDropdownStore.selectedValues),
          addRecipeNutrition: true,
          number: number ?? numberOfItems,
          offset,
          query: rootStore.query.getDuplicateParam('search'),
        },
      });
      runInAction(() => {
        if (result.success) {
          this._meta = Meta.success;
          if (this._list.length >= result.data.totalResults) {
            this._hasMore = false;
            return;
          }
          try {
            const data = normalizeRecipesData(result.data);
            if (+offset > 0) {
              this._list = [...this._list, ...data.results];
            } else {
              this._list = [];
              this._list = data.results;
            }
            if (result.data.totalResults < numberOfItems) {
              this._hasMore = false;
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

  private readonly _selectValueReaction: IReactionDisposer = reaction(
    () => this._multiDropdownStore.selectedValues,
    async () => {
      this._list = [];
      await this.getRecipeList();
    }
  );

  destroy(): void {
    this._meta = Meta.initial;
    this._list = [];
    this._hasMore = true;
    this._selectValueReaction();
  }
}
