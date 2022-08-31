import { Option } from '@projectTypes/types';
import { ILocalStore } from '@utils/UseLocalStore';
import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_selectedValues';

export default class SelectedValuesStore implements ILocalStore {
  private _selectedValues: Option[] = [];
  constructor() {
    makeObservable<SelectedValuesStore, PrivateFields>(this, {
      _selectedValues: observable.ref,
      selectedValues: computed,
      setSelectedValues: action,
    });
  }
  get selectedValues(): Option[] {
    return this._selectedValues;
  }
  setSelectedValues(values: Option[]) {
    this._selectedValues = values;
  }

  destroy(): void {
    this._selectedValues = [];
  }
}
