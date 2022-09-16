import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx';
import { Meta } from 'projectTypes/enums';
import InputValueStore from 'store/InputValueStore';
import { RecipeItemModel } from 'store/models/Food/recipeItem';
import { normalizeRecipesData, RecipesDataApi } from 'store/models/Food/recipesData';
import MultiDropdownStore from 'store/MultiDropdownStore';
import rootStore from 'store/RootStore';
import { numberOfItems } from 'utils/numberOfItems';
import { ILocalStore } from 'utils/useLocalStore';

import { IRecipeListStore } from './types';

type PrivateFields = '_list' | '_meta' | '_hasMore' | '_input';

export default class RecipeListStore implements IRecipeListStore, ILocalStore {
  private _list: RecipeItemModel[] = [];
  private _meta: Meta = Meta.initial;
  private _hasMore = true;
  private _multiDropdownStore: MultiDropdownStore = new MultiDropdownStore();
  private _input: InputValueStore = new InputValueStore();

  constructor() {
    makeObservable<RecipeListStore, PrivateFields>(this, {
      _meta: observable,
      _list: observable.ref,
      _hasMore: observable,
      _input: observable,
      meta: computed,
      list: computed,
      loading: computed,
      hasMore: computed,
      hasError: computed,
      hasSuccess: computed,
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

  get hasSuccess(): boolean {
    return this._meta === Meta.success;
  }

  get input() {
    return this._input;
  }

  getRecipeList = async (offset: number, number?: number): Promise<void> => {
    this._hasMore = true;
    this._meta = Meta.loading;
    try {
      const result = await rootStore.apiStore.getData<RecipesDataApi>({
        endpoint: '/recipes/complexSearch',
        params: {
          type: rootStore.query.getDuplicateParam('type'),
          addRecipeNutrition: true,
          number: number ?? numberOfItems,
          offset,
          query: rootStore.query.getDuplicateParam('search'),
        },
      });
      runInAction(() => {
        if (result.success) {
          this._meta = Meta.success;
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

  private readonly _qsReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('type'),
    () => {
      this._list = [];
      this.getRecipeList(0);
    }
  );

  destroy(): void {
    this._meta = Meta.initial;
    this._list = [];
    this._hasMore = true;
    this._qsReaction();
  }
}
