import { Injectable } from '@angular/core';

import { IObjectIteratation } from '../Interfaces/ioverall-config';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class TextOutputFieldManagerService {

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private utilsService: UtilsService
  ) { }

  /* GRID COLUMNS */

  columnSelectedTextOutput = (): IObjectIteratation[] => {
    return [
      { field: 'zoneId', header: 'ناحیه', isSelected: true, readonly: true },
      { field: 'itemTitle', header: 'عنوان', isSelected: true, readonly: true },
      { field: 'startIndex', header: 'ابتدا', isSelected: true, readonly: true },
      { field: 'endIndex', header: 'انتها', isSelected: true, readonly: true },
      { field: 'length', header: 'طول', isSelected: true, readonly: true }
    ];
  }

  /* API CALLS */
  getOutputTextField = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.getTextOutputManager().subscribe(res => {
          resolve(res);
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getZoneDictionary = (): Promise<any> => {
    return new Promise((resolve) => {
      resolve(this.dictionaryWrapperService.getZoneDictionary())
    });
  }

}
