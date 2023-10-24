import { Injectable } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service';
import { ENLocalStorageNames } from 'interfaces/enums.enum';

@Injectable({
  providedIn: 'root'
})
export class LocalClientConfigsService {

  constructor(private browserStorageService: BrowserStorageService) { }

  saveToLocalStorage = (name: ENLocalStorageNames, hasCount: boolean) => {
    this.browserStorageService.setToLocal(name, hasCount);
  }
  saveToLocalStorageType = (name: ENLocalStorageNames, obj: any) => {
    this.browserStorageService.setToLocal(name, obj);
  }
  getFromLocalStorageType = (name: ENLocalStorageNames, defaultVal: any): any => {
    const a = this.browserStorageService.getLocal(name);
    if (a === null) {
      this.saveToLocalStorageType(name, defaultVal)
      // return default value
      return defaultVal;
    }
    return a;
  }
  getFromLocalStorage = (name: ENLocalStorageNames, defaultVal: boolean): boolean => {
    const a = this.browserStorageService.getLocal(name);
    if (a === null) {
      this.saveToLocalStorage(name, defaultVal);
      return defaultVal;
    }
    return a;
  }
  getValue = (name: ENLocalStorageNames): any => {
    return this.browserStorageService.getLocal(name);
  }

}
