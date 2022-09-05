import { Option } from '@projectTypes/types';
import { ILocalStore } from '@utils/UseLocalStore';
import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_values';

export default class SelectedValuesStore implements ILocalStore {
  private _values: Option[] = [];

  constructor() {
    makeObservable<SelectedValuesStore, PrivateFields>(this, {
      _values: observable.ref,
      values: computed,
      setSelectedValues: action,
    });
  }

  get values(): Option[] {
    return this._values;
  }

  setSelectedValues(values: Option[]) {
    this._values = values;
  }

  destroy(): void {
    this._values = [];
  }
}
