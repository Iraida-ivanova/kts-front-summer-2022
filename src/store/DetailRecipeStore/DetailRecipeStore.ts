import { HTTPMethod, Meta } from '@projectTypes/enums';
import {
  DetailRecipeItemModel,
  IDetailRecipeItemApi,
  normalizeDetailRecipeItem,
} from '@store/models/Food/DetailRecipeItem';
import rootStore from '@store/RootStore';
import { ILocalStore } from '@utils/UseLocalStore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { IDetailRecipeStore } from './types';

type PrivateFields = '_item' | '_meta';

export default class DetailRecipeStore implements IDetailRecipeStore, ILocalStore {
  private readonly _id: string | undefined = undefined;
  private _item: DetailRecipeItemModel | null = null;
  private _meta: Meta = Meta.initial;

  constructor(id: string | undefined) {
    this._id = id;
    makeObservable<DetailRecipeStore, PrivateFields>(this, {
      _meta: observable,
      _item: observable.ref,
      meta: computed,
      item: computed,
      getDetailRecipe: action,
    });
  }

  get item(): DetailRecipeItemModel | null {
    return this._item;
  }

  get meta(): Meta {
    return this._meta;
  }

  get id(): string | undefined {
    return this._id;
  }

  getDetailRecipe = async (): Promise<void> => {
    this._meta = Meta.loading;
    this._item = null;
    try {
      const result = await rootStore.apiStore.request<IDetailRecipeItemApi>({
        method: HTTPMethod.GET,
        data: {},
        endpoint: `/recipes/${this._id}/information`,
        headers: {},
        params: {},
      });
      runInAction(() => {
        if (result.success) {
          try {
            this._meta = Meta.success;
            this._item = normalizeDetailRecipeItem(result.data);
          } catch (e) {
            this._meta = Meta.error;
            this._item = null;
          }
        } else {
          this._meta = Meta.error;
        }
      });
    } catch (e) {
      this._meta = Meta.error;
    }
  };

  destroy(): void {
    this._meta = Meta.initial;
    this._item = null;
  }
}