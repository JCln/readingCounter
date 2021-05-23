import { Injectable } from '@angular/core';

import { IDictionaryManager } from '../Interfaces/ioverall-config';
import { ConverterService } from './converter.service';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class SectorsManagerService {

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private converterService: ConverterService
  ) { }

  getProvinceDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getProvinceManager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }

  getZoneDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getZoneManager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  getZoneBoundDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getZoneBoundManager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  getRegionDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getRegionManager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  getCountryDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getCountryManager().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }

  getCountryDictionary = (): any => {
    return this.dictionaryWrapperService.getCountryDictionary();
  }
  getRegionDictionary = (): any => {
    return this.dictionaryWrapperService.getRegionDictionary();
  }
  getProvinceDictionary = (): any => {
    return this.dictionaryWrapperService.getProvinceDictionary();
  }
  getZoneDictionary = (): any => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  convertIdToTitle = (dataSource: any, dictionary: IDictionaryManager[], toConvert: string) => {
    this.converterService.convertIdToTitle(dataSource, dictionary, toConvert);
  }

}
