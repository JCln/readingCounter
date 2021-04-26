import { Injectable } from '@angular/core';
import { IDictionaryManager, IObjectIteratation, IResponses } from 'src/app/Interfaces/ioverall-config';
import { DictionaryWrapperService } from 'src/app/services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { UtilsService } from 'src/app/services/utils.service';

import { EN_messages } from '../Interfaces/enums.enum';
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
  addFragmentMaster = (body: IFragmentMaster): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.addFragmentMaster(body).subscribe((res: IResponses) => {
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
    if (masterId.length < 6) {
      this.routeToFragmentMaster();
      return;
    }
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
  addFragmentDetails = (body: IFragmentDetails): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.addFragmentDetails(body).subscribe((res: IResponses) => {
          if (res) {
            this.utilsService.snackBarMessageSuccess(res.message);
            resolve(res);
          }
        })
      })
    } catch (error) {
      console.error(error);
    }
  }
  editFragmentDetails = (body: IFragmentDetails) => {
    this.interfaceManagerService.editFragmentDetails(body).subscribe((res: IResponses) => {
      if (res)
        this.utilsService.snackBarMessageSuccess(res.message)
    })
  }
  removeFragmentDetails = (body: IFragmentDetails): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.deleteFragmentDetails(body).subscribe((res: IResponses) => {
          if (res) {
            this.utilsService.snackBarMessageSuccess(res.message)
            resolve(true);
          }
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getRouteParams = () => {
    return this.utilsService.getRouteBySplit('/');
  }
  routeToFragmentDetails = (route: string) => {
    this.utilsService.routeToByParams('/wr/m/nob/', route);
  }
  routeToFragmentMaster = () => {
    this.utilsService.routeTo('/wr/m/nob');
  }
  /**/
  getZoneDictionary = (): Promise<any> => {
    return new Promise((resolve) => {
      resolve(this.dictionaryWrapperService.getZoneDictionary());
    });
  }

  /* VALIDATION */
  private nullValidation = (sth: string | number, message?: string): boolean => {
    if (this.utilsService.isNull(sth)) {
      if (message)
        this.utilsService.snackBarMessageWarn(message);
      return false;
    }
    return true;
  }
  private NANValidation = (sth: string, message?: string): boolean => {
    if (this.utilsService.isNaN(sth)) {
      if (message)
        this.utilsService.snackBarMessageWarn(message);
      return false;
    }
    return true;
  }

  /* VERIFICATION */


  private masterValidation = (): boolean => {
    if (!this.nullValidation(this.fragmentMaster.zoneId, EN_messages.insert_zone))
      return false;
    if (!this.nullValidation(this.fragmentMaster.fromEshterak, 'از اشتراک را وارد نمایید'))
      return false;
    if (!this.nullValidation(this.fragmentMaster.toEshterak, 'تا اشتراک را وارد نمایید'))
      return false;
    if (!this.nullValidation(this.fragmentMaster.routeTitle, 'عنوان مسیر را وارد نمایید'))
      return false;

    if (!this.NANValidation(this.fragmentMaster.fromEshterak, 'فرمت از اشتراک ناصحیح است'))
      return false;
    if (!this.NANValidation(this.fragmentMaster.fromEshterak, 'فرمت  تا اشتراک ناصحیح است'))
      return false;

    if (!this.utilsService.isSameLength(this.fragmentMaster.fromEshterak, this.fragmentMaster.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.sameLength_eshterak);
      return false;
    }

    if (!this.utilsService.isFromLowerThanToByString(this.fragmentMaster.fromEshterak, this.fragmentMaster.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.lessThan_eshterak);
      return false;
    }

    if (!this.utilsService.lengthControl(this.fragmentMaster.fromEshterak, this.fragmentMaster.toEshterak, 5, 10)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_esterak);
      return false;
    }
    return true;
  }
  ValidationMasterNoMessage = (fragmentMaster: IFragmentMaster): boolean => {
    if (!this.nullValidation(fragmentMaster.zoneId))
      return false;
    if (!this.nullValidation(fragmentMaster.fromEshterak))
      return false;
    if (!this.nullValidation(fragmentMaster.toEshterak))
      return false;
    if (!this.nullValidation(fragmentMaster.routeTitle))
      return false;

    if (!this.NANValidation(fragmentMaster.fromEshterak))
      return false;
    if (!this.NANValidation(fragmentMaster.fromEshterak))
      return false;

    if (!this.utilsService.isSameLength(fragmentMaster.fromEshterak, fragmentMaster.toEshterak)) {
      return false;
    }

    if (!this.utilsService.isFromLowerThanToByString(fragmentMaster.fromEshterak, fragmentMaster.toEshterak)) {
      return false;
    }

    if (!this.utilsService.lengthControl(fragmentMaster.fromEshterak, fragmentMaster.toEshterak, 5, 10)) {
      return false;
    }
  }
  private detailsValidation = (): boolean => {
    if (!this.nullValidation(this.fragmentDetails.fragmentMasterId, ('خطا در ارسال مقادیر')))
      return false;
    if (!this.nullValidation(this.fragmentDetails.fromEshterak, 'از اشتراک را وارد نمایید'))
      return false;
    if (!this.nullValidation(this.fragmentDetails.toEshterak, 'تا اشتراک را وارد نمایید'))
      return false;
    if (!this.nullValidation(this.fragmentDetails.routeTitle, 'عنوان مسیر را وارد نمایید'))
      return false;

    if (!this.NANValidation(this.fragmentDetails.fromEshterak, 'فرمت از اشتراک ناصحیح است'))
      return false;

    if (!this.NANValidation(this.fragmentDetails.fromEshterak, 'فرمت  تا اشتراک ناصحیح است'))
      return false;
    if (!this.utilsService.isFromLowerThanToByString(this.fragmentDetails.fromEshterak, this.fragmentDetails.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.lessThan_eshterak);
      return false;
    }

    if (!this.utilsService.isSameLength(this.fragmentDetails.fromEshterak, this.fragmentDetails.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.sameLength_eshterak);
      return false;
    }

    if (!this.utilsService.lengthControl(this.fragmentDetails.fromEshterak, this.fragmentDetails.toEshterak, 5, 10)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_esterak);
      return false;
    }
    return true;
  }
  ValidationDetailsNoMessage = (fragmentDetails: IFragmentDetails): boolean => {
    if (!this.nullValidation(fragmentDetails.fragmentMasterId))
      return false;
    if (!this.nullValidation(fragmentDetails.fromEshterak))
      return false;
    if (!this.nullValidation(fragmentDetails.toEshterak))
      return false;
    if (!this.nullValidation(fragmentDetails.routeTitle))
      return false;

    if (!this.NANValidation(fragmentDetails.fromEshterak))
      return false;
    if (!this.NANValidation(fragmentDetails.fromEshterak))
      return false;

    if (!this.utilsService.isFromLowerThanToByString(fragmentDetails.fromEshterak, fragmentDetails.toEshterak))
      return false;
    if (!this.utilsService.isSameLength(fragmentDetails.fromEshterak, fragmentDetails.toEshterak))
      return false;
    if (!this.utilsService.lengthControl(fragmentDetails.fromEshterak, fragmentDetails.toEshterak, 5, 10))
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
