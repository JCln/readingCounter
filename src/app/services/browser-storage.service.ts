import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {
  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }
  get(key: string): any {
    if (this.isLocalStorageSupported)
      return JSON.parse(this.localStorage.getItem(key));
    return null;
  }
  getAll(): any {
    const a = [];
    for (const key in this.localStorage) {
      if (this.localStorage.hasOwnProperty(key)) {
        a.push(this.get(key));
      }
    }
    return a;
  }
  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }
  removeLocal(key: string) {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }
  removeSession = (key: string) => {
    if (this.isSessionStorageSupported) {
      sessionStorage.removeItem(key);
      sessionStorage.clear();
      return true;
    }
    return false;
  }
  removeAll = () => {
    for (const key in this.localStorage) {
      if (this.localStorage.hasOwnProperty(key))
        this.removeLocal(key);
    }
  }
  // is local storage supported by the browser
  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }
  get isSessionStorageSupported(): boolean {
    return !!this.localStorage;
  }
}
