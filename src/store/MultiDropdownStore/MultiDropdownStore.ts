import { action, computed, makeObservable, observable } from 'mobx';
import { Option } from 'projectTypes/types';
import { ILocalStore } from 'utils/useLocalStore';

type PrivateFields = '_isOpened' | '_selectedValues';
export default class MultiDropdownStore implements ILocalStore {
  private _isOpened = false;
  private _selectedValues: Option[] = [];

  constructor() {
    makeObservable<MultiDropdownStore, PrivateFields>(this, {
      _isOpened: observable,
      _selectedValues: observable.ref,
      isOpened: computed,
      selectedValues: computed,
      changeIsOpened: action,
      close: action,
      setSelectedValues: action,
      deleteFromSelectedValues: action,
    });
  }

  get isOpened(): boolean {
    return this._isOpened;
  }

  changeIsOpened(): void {
    this._isOpened = !this._isOpened;
  }

  close(): void {
    this._isOpened = false;
  }

  get selectedValues(): Option[] {
    return this._selectedValues;
  }

  setSelectedValues(values: Option[]) {
    // eslint-disable-next-line no-console
    console.log('setSelectedValues', this._selectedValues);
    this._selectedValues = values;
  }

  deleteFromSelectedValues(value: Option) {
    this._selectedValues = this._selectedValues.filter((item) => item.key !== value.key);
  }

  destroy(): void {
    this._isOpened = false;
    this._selectedValues = [];
  }
}
