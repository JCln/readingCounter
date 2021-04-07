import { Injectable } from '@angular/core';
import { IObjectIteratation, IResponses } from 'src/app/Interfaces/ioverall-config';
import { DictionaryWrapperService } from 'src/app/services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { UtilsService } from 'src/app/services/utils.service';

import { IFragmentDetails, IFragmentMaster } from './../Interfaces/imanage';

@Injectable({
  providedIn: 'root'
})
export class FragmentManagerService {

  columnSelectedFragmentMaster = (): IObjectIteratation[] => {
    return [
      { field: 'zoneId', header: 'ناحیه', isSelected: true, readonly: true },
      { field: 'routeTitle', header: 'مسیر', isSelected: true, readonly: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, readonly: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, readonly: false },
      { field: 'isValidated', header: 'تایید شده', isSelected: true, readonly: true },
    ];
  }
  columnSelectedFragmentDetails = (): IObjectIteratation[] => {
    return [
      { field: 'routeTitle', header: 'مسیر', isSelected: true, readonly: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, readonly: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, readonly: false },
      { field: 'orderDigit', header: 'ترتیب', isSelected: true, readonly: true },
      { field: 'orderPersian', header: 'فارسی', isSelected: true, readonly: true }
    ];
  }
  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private utilsService: UtilsService
  ) { }

  /* Master */
  getDataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.getFragmentMaster().subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(e => e);
    }
  }
  addFragmentMaster = (body: IFragmentMaster) => {
    this.interfaceManagerService.addFragmentMaster(body).subscribe((res: IResponses) => {
      if (res)
        this.utilsService.snackBarMessageSuccess(res.message)
    })
  }
  editFragmentMaster = (body: IFragmentMaster) => {
    this.interfaceManagerService.editFragmentMaster(body).subscribe((res: IResponses) => {
      if (res)
        this.utilsService.snackBarMessageSuccess(res.message)
    })
  }
  removeFragmentMaster = (body: IFragmentMaster): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.deleteFragmentMaster(body).subscribe((res: IResponses) => {
          if (res) {
            this.utilsService.snackBarMessageSuccess(res.message);
            resolve(true);
          }
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  isValidateMaster = (body: IFragmentMaster) => {
    this.interfaceManagerService.validateFragmentMaster(body).subscribe((res: IResponses) => {
      if (res)
        this.utilsService.snackBarMessageSuccess(res.message)
    })
  }
  /* Details */
  getFragmentDetails = (masterId: string): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.getFragmentDetails(masterId).subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(e => e);
    }
  }
  addFragmentDetails = (body: IFragmentDetails) => {
    this.interfaceManagerService.addFragmentDetails(body).subscribe((res: IResponses) => {
      if (res)
        this.utilsService.snackBarMessageSuccess(res.message)
    })
  }
  editFragmentDetails = (body: IFragmentDetails) => {
    this.interfaceManagerService.editFragmentDetails(body).subscribe((res: IResponses) => {
      if (res)
        this.utilsService.snackBarMessageSuccess(res.message)
    })
  }
  removeFragmentDetails = (body: IFragmentDetails) => {
    this.interfaceManagerService.deleteFragmentDetails(body).subscribe((res: IResponses) => {
      if (res)
        this.utilsService.snackBarMessageSuccess(res.message)
    })
  }
  getRouteParams = () => {
    return this.utilsService.getRouteBySplit('/');
  }
  routeToFragmentDetails = (route: string) => {
    this.utilsService.routeToByParams('/wr/m/nob/', route);
  }
  /**/
  getZoneDictionary = (): Promise<any> => {
    return new Promise((resolve) => {
      resolve(this.dictionaryWrapperService.getZoneDictionary());
    });
  }

}
