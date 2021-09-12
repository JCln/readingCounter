import { Injectable } from '@angular/core';
import { ENHasImportDynamicCount, ENLocalStorageNames } from 'interfaces/ioverall-config';

import { BrowserStorageService } from './browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalClientConfigsService {

  constructor(private browserStorageService: BrowserStorageService) { }

  saveToLocalStorage = (name: ENLocalStorageNames, hasDynamicCount: ENHasImportDynamicCount) => {
    this.browserStorageService.set(name, hasDynamicCount);
  }

  getFromLocalStorage = (name: ENLocalStorageNames): boolean => {
    const a = this.browserStorageService.get(name);
    if (a === null) {
      this.saveToLocalStorage(ENLocalStorageNames.hasDynamicCount, ENHasImportDynamicCount.hasCount)
      // return default value
      return true;
    }
    return a;
  }

}
