import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import {
  ENRandomNumbers,
  ENSnackBarColors,
  ENSnackBarTimes,
  IDictionaryManager,
  IObjectIteratation,
  IResponses,
} from 'interfaces/ioverall-config';
import { IAutomaticImportAddEdit } from 'interfaces/ireads-manager';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { UtilsService } from 'services/utils.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

import { IFragmentDetails, IFragmentMaster } from '../interfaces/ireads-manager';
import { EN_Routes } from '../interfaces/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class FragmentManagerService {
  fragmentDetails: IFragmentDetails;
  zoneDictionary: IDictionaryManager[] = [];
  fragmentDetails_pageSign = {
    GUid: null
  };

  columnSelectedFragmentMaster = (): IObjectIteratation[] => {
    return this.columnManager.columnSelectedMenus('_fragmentMaster');
  }
  columnSelectedFragmentDetails = (): IObjectIteratation[] => {
    return this.columnManager.columnSelectedMenus('fragmentDetails');
  }
  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    public utilsService: UtilsService,
    private columnManager: ColumnManager
  ) { }

  getDataSourceByQuote = (method: ENInterfaces, id: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(method, id).subscribe(res => {
        resolve(res);
      })
    })
  }
  getDataSource = (method: ENInterfaces): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(method).subscribe(res => {
        resolve(res);
      })
    })
  }
  postBody = (method: ENInterfaces, body: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(method, body).subscribe((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(res);
      })
    })
  }
  postByQuote = (method: ENInterfaces, id: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTSG(method, id).toPromise().then((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(res);
      })
    })
  }
  /* Details */
  getFragmentDetails = (masterId: string): Promise<any> => {
    if (masterId.length < 6) {
      this.routeToFragmentMaster();
      return;
    }
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETID(ENInterfaces.fragmentDETAILSDETAILS, masterId).subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(e => e);
    }
  }
  getRouteParams = () => {
    return this.utilsService.getRouteBySplit('/');
  }
  routeToFragmentDetails = (route: string) => {
    this.fragmentDetails_pageSign.GUid = route;
    console.log(route);

    this.utilsService.routeToByUrl(EN_Routes.wrmrnobDetail);
  }
  routeToAutomaticImport = () => {
    this.utilsService.routeTo(EN_Routes.wrmrnobautoImport);
  }
  routeToFragmentMaster = () => {
    this.utilsService.routeTo(EN_Routes.wrmrnob);
  }
  /**/
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getPeriodKindDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getPeriodKindDictionary();
  }
  getUserCounterReaders = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getUserCounterReaderDictionary(zoneId);
  }

  /* VALIDATION */
  private nullValidation = (sth: string | number, message?: string): boolean => {
    if (MathS.isNull(sth)) {
      if (message)
        this.utilsService.snackBarMessageWarn(message);
      return false;
    }
    return true;
  }
  private NANValidation = (sth: string, message?: string): boolean => {
    if (MathS.isNaN(sth)) {
      if (message)
        this.utilsService.snackBarMessageWarn(message);
      return false;
    }
    return true;
  }
  showSnack = (message: string, color: ENSnackBarColors) => {
    this.utilsService.snackBarMessage(message, ENSnackBarTimes.fourMili, color);
  }

  /* VERIFICATION */

  firstConfirmDialog = (): Promise<any> => {
    const a = {
      messageTitle: EN_messages.confirm_remove,
      minWidth: '19rem',
      isInput: false,
      isDelete: true
    }
    return this.utilsService.firstConfirmDialog(a);
  }
  masterValidation = (body: IFragmentMaster): boolean => {
    console.log(body);
    if (MathS.isNull(body.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNull(body.fromEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_fromEshterak);
      return false;
    }
    if (MathS.isNull(body.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_ToEshterak);
      return false;
    }
    if (MathS.isNull(body.routeTitle)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_title_route);
      return false;
    }
    if (!this.NANValidation(body.fromEshterak, EN_messages.format_invalid_from_eshterak))
      return false;
    if (!this.NANValidation(body.fromEshterak, EN_messages.format_invalid_to_eshterak))
      return false;

    if (!MathS.isSameLength(body.fromEshterak, body.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.sameLength_eshterak);
      return false;
    }

    if (!MathS.isFromLowerThanToByString(body.fromEshterak, body.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.lessThan_eshterak);
      return false;
    }

    if (!MathS.lengthControl(body.fromEshterak, body.toEshterak, 5, 15)) {
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

    if (!MathS.isSameLength(fragmentMaster.fromEshterak, fragmentMaster.toEshterak)) {
      return false;
    }

    if (!MathS.isFromLowerThanToByString(fragmentMaster.fromEshterak, fragmentMaster.toEshterak)) {
      return false;
    }

    if (!MathS.lengthControl(fragmentMaster.fromEshterak, fragmentMaster.toEshterak, 5, 15)) {
      return false;
    }
    return true;
  }
  private detailsValidation = (): boolean => {
    if (!this.nullValidation(this.fragmentDetails.fragmentMasterId, EN_messages.call_supportGroup))
      return false;
    if (!this.nullValidation(this.fragmentDetails.fromEshterak, EN_messages.insert_fromEshterak))
      return false;
    if (!this.nullValidation(this.fragmentDetails.toEshterak, EN_messages.insert_ToEshterak))
      return false;
    if (!this.nullValidation(this.fragmentDetails.routeTitle, EN_messages.insert_title_route))
      return false;

    if (!this.NANValidation(this.fragmentDetails.fromEshterak, EN_messages.format_invalid_from_eshterak))
      return false;

    if (!this.NANValidation(this.fragmentDetails.toEshterak, EN_messages.format_invalid_to_eshterak))
      return false;
    if (!MathS.isFromLowerThanToByString(this.fragmentDetails.fromEshterak, this.fragmentDetails.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.lessThan_eshterak);
      return false;
    }

    if (!MathS.isSameLength(this.fragmentDetails.fromEshterak, this.fragmentDetails.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.sameLength_eshterak);
      return false;
    }

    if (!MathS.lengthControl(this.fragmentDetails.fromEshterak, this.fragmentDetails.toEshterak, 5, 15)) {
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
    if (!this.NANValidation(fragmentDetails.toEshterak))
      return false;

    if (!MathS.isFromLowerThanToByString(fragmentDetails.fromEshterak, fragmentDetails.toEshterak))
      return false;
    if (!MathS.isSameLength(fragmentDetails.fromEshterak, fragmentDetails.toEshterak))
      return false;
    if (!MathS.lengthControl(fragmentDetails.fromEshterak, fragmentDetails.toEshterak, 5, 15))
      return false;
    return true;
  }
  verificationAutoImportAdd = (body: IAutomaticImportAddEdit): boolean => {
    if (MathS.isNull(body.startDay)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_startDay);
      return false;
    }
    if (MathS.isNull(body.endDay)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_endDay);
      return false;
    }
    if (MathS.isNull(body.startTime)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_startTime);
      return false;
    }
    if (!MathS.isExactLengthYouNeed(body.startTime, ENRandomNumbers.five)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_isNotExactLengthEndTime);
      return false;
    }
    if (!MathS.isExactLengthYouNeed(body.startDay, ENRandomNumbers.ten)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_isNotExactLengthNumber);
      return false;
    }
    if (!MathS.isExactLengthYouNeed(body.endDay, ENRandomNumbers.ten)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_isNotExactLengthNumber);
      return false;
    }
    if (MathS.isNull(body.readingPeriodKindId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriodKind);
      return false;
    }
    if (!MathS.persentCheck(body.alalHesabPercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.percent_alalhesab);
      return false;
    }
    if (!MathS.persentCheck(body.imagePercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.percent_pictures);
      return false;
    }
    if (MathS.isNaN(body.alalHesabPercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_alalhesab);
      return false;
    }
    if (MathS.isNaN(body.imagePercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_imagePercent);
      return false;
    }
    return true;
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
  customizeSelectedColumns = (_selectCols: any) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
}
