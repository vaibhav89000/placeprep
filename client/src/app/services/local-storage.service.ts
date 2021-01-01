import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      return this.localStorage.getItem(key);
    }

    return null;
  }

  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, value);

      return true;
    }

    return false;
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);

      return true;
    }

    return false;
  }

  clear(): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.clear();
      return true;
    }

    return false;
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }
}
