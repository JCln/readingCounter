import { Injectable } from '@angular/core';
import { ENLocalStorageNames } from 'interfaces/ioverall-config';

import { BrowserStorageService } from './browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalClientConfigsService {

  constructor(private browserStorageService: BrowserStorageService) { }

  saveToLocalStorage = (name: ENLocalStorageNames, hasCount: boolean) => {
    this.browserStorageService.set(name, hasCount);
  }
  saveToLocalStorageType = (name: ENLocalStorageNames, obj: any) => {
    this.browserStorageService.set(name, obj);
  }
  getFromLocalStorageType = (name: ENLocalStorageNames, defaultVal: any): any => {
    const a = this.browserStorageService.get(name);
    if (a === null) {
      this.saveToLocalStorageType(name, defaultVal)
      // return default value
      return defaultVal;
    }
    return a;
  }
  getFromLocalStorage = (name: ENLocalStorageNames, defaultVal: boolean): boolean => {
    const a = this.browserStorageService.get(name);
    if (a === null) {
      this.saveToLocalStorage(name, defaultVal);
      return defaultVal;
    }
    return a;
  }
  getValue = (name: ENLocalStorageNames): any => {
    return this.browserStorageService.get(name);
  }

}
