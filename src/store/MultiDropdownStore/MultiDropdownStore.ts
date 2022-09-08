import { Option } from '@projectTypes/types';
import { ILocalStore } from '@utils/UseLocalStore';
import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_isOpened' | '_selectedValues';
export default class MultiDropdownStore implements ILocalStore {
  private _isOpened: boolean = false;
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
    this._selectedValues = values;
  }

  destroy(): void {
    this._isOpened = false;
    this._selectedValues = [];
  }
}