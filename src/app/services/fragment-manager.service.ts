import { PageSignsService } from 'services/page-signs.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENRandomNumbers, ENSnackBarColors, ENSnackBarTimes, EN_messages } from 'interfaces/enums.enum';
import {
  IDictionaryManager
} from 'interfaces/ioverall-config';
import { IAutomaticImportAddEdit } from 'interfaces/ireads-manager';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { UtilsService } from 'services/utils.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

import { IFragmentDetails, IFragmentMaster } from '../interfaces/ireads-manager';
import { EN_Routes } from '../interfaces/routes.enum';
import { AjaxReqWrapperService } from './ajax-req-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class FragmentManagerService {
  fragmentDetails: IFragmentDetails;
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public dictionaryWrapperService: DictionaryWrapperService,
    public pageSignsService: PageSignsService,
    public utilsService: UtilsService,
    public columnManager: ColumnManager
  ) { }

  routeToFragmentDetails = (body: IFragmentMaster) => {
    this.pageSignsService.fragmentDetails_pageSign.GUid = body.id;
    this.pageSignsService.fragmentDetails_pageSign.zoneTitle = body.changableZoneId;
    this.pageSignsService.fragmentDetails_pageSign.routeTitle = body.routeTitle;
    this.pageSignsService.fragmentDetails_pageSign.fromEshterak = body.fromEshterak;
    this.pageSignsService.fragmentDetails_pageSign.toEshterak = body.toEshterak;
    this.utilsService.routeToByUrl(EN_Routes.fragmentDetail);
  }
  routeToFragmentMaster = () => {
    this.utilsService.routeTo(EN_Routes.fragment);
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

  /* VERIFICATION */

  firstConfirmDialog = (text?: string): Promise<any> => {
    const a = {
      messageTitle: EN_messages.confirm_remove,
      text: text,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      icon: 'pi pi-trash'
    }
    return this.utilsService.firstConfirmDialog(a);
  }
  masterValidation = (body: IFragmentMaster): boolean => {
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

}
