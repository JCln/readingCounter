import { Injectable } from '@angular/core';

import { IDictionaryManager, IResponses } from '../Interfaces/ioverall-config';
import { ENInterfaces } from './../Interfaces/en-interfaces.enum';
import { ConverterService } from './converter.service';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class SectorsManagerService {

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private converterService: ConverterService,
    private utilsService: UtilsService
  ) { }

  getProvinceDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.ProvinceGET).subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  getZoneDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.ZoneGET).subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  getZoneBoundDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.ZoneBoundGET).subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  getRegionDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.RegionGET).subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  getCountryDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.CountryGET).subscribe(res => {
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

  sectorsAddEdit = (apiUse: ENInterfaces, value: any) => {
    this.interfaceManagerService.POSTBODY(apiUse, value).subscribe((res: IResponses) => {
      if (res) {
        this.utilsService.snackBarMessageSuccess(res.message);
      }
    })
  }
  sectorsDelete = (apiUse: ENInterfaces, id: any) => {
    this.interfaceManagerService.POST(apiUse, id).subscribe((res: IResponses) => {
      if (res) {
        this.utilsService.snackBarMessageSuccess(res.message);
      }
    });
  }

  convertIdToTitle = (dataSource: any, dictionary: IDictionaryManager[], toConvert: string) => {
    this.converterService.convertIdToTitle(dataSource, dictionary, toConvert);
  }

}
