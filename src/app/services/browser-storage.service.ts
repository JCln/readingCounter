import { Injectable } from '@angular/core';
import { ENAuthTokenType } from 'interfaces/iauth-guard-permission';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {
  localStorage: Storage;
  sessionStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
    this.sessionStorage = window.sessionStorage;
  }
  get(key: string): any {
    if (this.isLocalStorageSupported)
      return JSON.parse(this.localStorage.getItem(key));
    return null;
  }
  getSession(key: string): any {
    if (this.sessionStorage)
      return JSON.parse(this.sessionStorage.getItem(key));
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
  isExists(key: string): boolean {
    if (!this.isLocalStorageSupported) return false;
    if (this.localStorage.getItem(key) == null || this.localStorage.getItem(key) == undefined) return false;
    return true;
  }
  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }
  setToSession(key: string, value: any): boolean {
    if (this.isSessionStorageSupported) {
      this.sessionStorage.setItem(key, JSON.stringify(value));
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
    for (const key in this.sessionStorage) {
      if (this.sessionStorage.hasOwnProperty(key))
        this.removeSession(key);
    }
  }
  removeAllExceptAuths = () => {
    for (const key in this.localStorage) {
      if (this.localStorage.hasOwnProperty(key) && key !== ENAuthTokenType.refresh_token && key !== ENAuthTokenType.access_token && key !== ENAuthTokenType.login_id) {
        this.removeLocal(key);
      }
    }
    for (const key in this.sessionStorage) {
      if (this.sessionStorage.hasOwnProperty(key) && key !== ENAuthTokenType.refresh_token && key !== ENAuthTokenType.access_token && key !== ENAuthTokenType.login_id) {
        this.removeSession(key);
      }
    }
  }
  // is local storage supported by the browser
  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }
  get isSessionStorageSupported(): boolean {
    return !!this.sessionStorage;
  }
}