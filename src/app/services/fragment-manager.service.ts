import { Injectable } from '@angular/core';
import { IDictionaryManager, IObjectIteratation, IResponses } from 'src/app/Interfaces/ioverall-config';
import { DictionaryWrapperService } from 'src/app/services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { UtilsService } from 'src/app/services/utils.service';

import { IFragmentDetails, IFragmentMaster } from './../Interfaces/imanage';

@Injectable({
  providedIn: 'root'
})
export class FragmentManagerService {
  fragmentMaster: IFragmentMaster;
  fragmentDetails: IFragmentDetails;

  zoneDictionary: IDictionaryManager[] = [];

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
  removeFragmentMaster = (body: IFragmentMaster): Promise<boolean> => {
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
  isValidateMaster = (body: IFragmentMaster): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.validateFragmentMaster(body).subscribe((res: IResponses) => {
          if (res) {
            this.utilsService.snackBarMessageSuccess(res.message);
            resolve(res);
          }
        })
      });
    } catch (error) {
      console.error(error);
    }
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
  removeFragmentDetails = (body: IFragmentDetails): boolean => {
    this.interfaceManagerService.deleteFragmentDetails(body).subscribe((res: IResponses) => {
      if (res) {
        this.utilsService.snackBarMessageSuccess(res.message)
        return true;
      }
    })
    return false;
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

  /* VERIFICATION */
  private masterValidation = (): boolean => {
    if (this.utilsService.isNull(this.fragmentMaster.zoneId)) {
      this.utilsService.snackBarMessageWarn('ناحیه ای وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.fragmentMaster.fromEshterak)) {
      this.utilsService.snackBarMessageWarn('از اشتراک را وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.fragmentMaster.toEshterak)) {
      this.utilsService.snackBarMessageWarn('تا اشتراک را وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.fragmentMaster.routeTitle)) {
      this.utilsService.snackBarMessageWarn('عنوان مسیر را وارد نمایید');
      return false;
    }

    if (this.utilsService.isNaN(this.fragmentMaster.fromEshterak)) {
      this.utilsService.snackBarMessageWarn('فرمت از اشتراک ناصحیح است');
      return false;
    }
    if (this.utilsService.isNaN(this.fragmentMaster.fromEshterak)) {
      this.utilsService.snackBarMessageWarn('فرمت  تا اشتراک ناصحیح است');
      return false;
    }

    if (!this.utilsService.isSameLength(this.fragmentMaster.fromEshterak, this.fragmentMaster.toEshterak)) {
      this.utilsService.snackBarMessageWarn('تعداد ارقام از اشتراک، تا اشتراک باید برابر باشد');
      return false;
    }

    if (!this.utilsService.isFromLowerThanToByString(this.fragmentMaster.fromEshterak, this.fragmentMaster.toEshterak)) {
      this.utilsService.snackBarMessageWarn('از اشتراک کمتر از تا اشتراک است!');
      return false;
    }

    if (!this.utilsService.lengthControl(this.fragmentMaster.fromEshterak, this.fragmentMaster.toEshterak, 5, 10)) {
      this.utilsService.snackBarMessageWarn('فرمت اشتراک ناصحیح است');
      return false;
    }
    return true;
  }
  private detailsValidation = (): boolean => {
    if (this.utilsService.isNull(this.fragmentDetails.fragmentMasterId)) {
      this.utilsService.snackBarMessageWarn('خطا در ارسال مقادیر');
      return false;
    }
    if (this.utilsService.isNull(this.fragmentDetails.fromEshterak)) {
      this.utilsService.snackBarMessageWarn('از اشتراک را وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.fragmentDetails.toEshterak)) {
      this.utilsService.snackBarMessageWarn('تا اشتراک را وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.fragmentDetails.routeTitle)) {
      this.utilsService.snackBarMessageWarn('عنوان مسیر را وارد نمایید');
      return false;
    }

    if (this.utilsService.isNaN(this.fragmentDetails.fromEshterak)) {
      this.utilsService.snackBarMessageWarn('فرمت از اشتراک ناصحیح است');
      return false;
    }

    if (this.utilsService.isNaN(this.fragmentDetails.fromEshterak)) {
      this.utilsService.snackBarMessageWarn('فرمت  تا اشتراک ناصحیح است');
      return false;
    }
    if (!this.utilsService.isFromLowerThanToByString(this.fragmentDetails.fromEshterak, this.fragmentDetails.toEshterak)) {
      this.utilsService.snackBarMessageWarn('از اشتراک کمتر از تا اشتراک است!');
      return false;
    }

    if (!this.utilsService.isSameLength(this.fragmentDetails.fromEshterak, this.fragmentDetails.toEshterak)) {
      this.utilsService.snackBarMessageWarn('تعداد ارقام از اشتراک، تا اشتراک باید برابر باشد');
      return false;
    }

    if (!this.utilsService.lengthControl(this.fragmentDetails.fromEshterak, this.fragmentDetails.toEshterak, 5, 10)) {
      this.utilsService.snackBarMessageWarn('فرمت اشتراک ناصحیح است');
      return false;
    }
    return true;
  }

  verificationMaster = (fragmentMaster: IFragmentMaster): boolean => {
    this.fragmentMaster = fragmentMaster;
    return this.masterValidation();
  }
  verificationDetails = (fragmentDetails: IFragmentDetails): boolean => {
    this.fragmentDetails = fragmentDetails;
    return this.detailsValidation();
  }

  findIDFromTitleZoneDictionary = (title: number | string): number => {
    let a = null;
    this.zoneDictionary.find(item => {
      if (item.title === title)
        a = item.id
    })
    return a;
  }
  setZoneDictionary = (zoneDic: IDictionaryManager[]) => {
    if (!this.zoneDictionary)
      this.zoneDictionary = zoneDic;
  }

}
