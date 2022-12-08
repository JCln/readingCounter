import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IResponses } from 'interfaces/ioverall-config';
import { UtilsService } from 'services/utils.service';

import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';
import { SectionsService } from './sections.service';

@Injectable({
  providedIn: 'root'
})
export class SectorsManagerService {

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private utilsService: UtilsService,  
    private sectionsService: SectionsService
  ) { }

  /*API CALLS */
  getSectorsDataSource = (method: ENInterfaces): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(method).subscribe(res => {
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

  sectorsAddEdit = (apiUse: ENInterfaces, value: any): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(apiUse, value).toPromise().then((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(res);
      })
    })
  }
  sectorsDelete = (apiUse: ENInterfaces, id: any) => {
    this.interfaceManagerService.POST(apiUse, id).subscribe((res: IResponses) => {
      if (res) {
        this.utilsService.snackBarMessageSuccess(res.message);
      }
    });
  }
  deleteSingleRow = (place: ENInterfaces, id: number) => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POST(place, id).subscribe((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(true);
      })
    });
  }
  firstConfirmDialog = (): Promise<any> => {
    const a = {
      messageTitle: EN_messages.confirm_remove,
      minWidth: '19rem',
      isInput: false,
      isDelete: true
    }
    return this.utilsService.firstConfirmDialog(a);
  }
  /*FOR COUNTRY */
  addOrEditCountry = (place: ENInterfaces, result: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(place, result).toPromise().then((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(res);
      })
    });
  }
  /* VALIDATION & VERIFICATION */
  verification = (dataSource: any): boolean => {
    this.sectionsService.setSectionsValue(dataSource);
    if (!this.sectionsService.sectionVertification())
      return false;
    return true;
  }

}
