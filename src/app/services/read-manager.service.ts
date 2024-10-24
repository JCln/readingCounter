import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { IDynamicTraverse } from './../interfaces/ireads-manager';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENSelectedColumnVariables, EN_messages } from 'interfaces/enums.enum';
import { ColumnManager } from '../classes/column-manager';
import { MathS } from '../classes/math-s';
import { ICounterState, IGuild, IImageAttribution, ITextOutput } from '../interfaces/ireads-manager';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { UtilsService } from './utils.service';
import { IBlockOrSafeIp } from 'interfaces/iserver-manager';
import { VerificationService } from './verification.service';

@Injectable({
  providedIn: 'root'
})
export class ReadManagerService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public dictionaryWrapperService: DictionaryWrapperService,
    private verificationService: VerificationService,
    public utilsService: UtilsService,
    public columnManager: ColumnManager
  ) { }

  postObjectWithSuccessMessage = async (method: ENInterfaces, body: object): Promise<any> => {
    const res = await this.ajaxReqWrapperService.postDataSourceByObject(method, body);
    this.utilsService.snackBarMessageSuccess(res.message);
    return res;
  }
  postObjectWithSuccessMessageBol = async (method: ENInterfaces, body: object): Promise<any> => {
    const res = await this.ajaxReqWrapperService.postDataSourceByObject(method, body);
    this.utilsService.snackBarMessageSuccess(res.message);
    return true;
  }
  counterStateVertification = (dataSource: ICounterState): boolean => {
    if (MathS.isNull(dataSource.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNullZero(dataSource.moshtarakinId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_moshtarakinId);
      return false;
    }
    if (MathS.isNull(dataSource.title)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
      return false;
    }

    if (MathS.isNaN(dataSource.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNaN(dataSource.clientOrder)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNaN(dataSource.moshtarakinId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }

    return true;
  }
  verification = (dataSource: any): boolean => {
    if (!this.verificationService.sectionVertification(dataSource))
      return false;
    return true;
  }
  verificationImageAttribution = (dataSource: IImageAttribution): boolean => {
    if (MathS.isNull(dataSource.title)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
      return false;
    }
    return true;
  }
  verificationGuild = (dataSource: IGuild): boolean => {
    if (MathS.isNull(dataSource.title)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
      return false;
    }
    return true;
  }
  verificationBlockOrSafeIP = (dataSource: IBlockOrSafeIp): boolean => {
    if (MathS.isNullTextValidation(dataSource.ip)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_IP);
      return false;
    }
    if (MathS.isNullTextValidation(dataSource.subnet)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_subnet);
      return false;
    }
    return true;
  }
  verificationDynamicTraverse = (dataSource: IDynamicTraverse): boolean => {
    if (MathS.isNull(dataSource.title)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
      return false;
    }
    if (MathS.isNull(dataSource.storageTitle)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_LatinTitle);
      return false;
    }
    return true;
  }
  verificationCounterState = (dataSource: ICounterState): boolean => {
    if (!this.counterStateVertification(dataSource))
      return false;
    return true;
  }
  verificationTextOutputEditedRow = (dataSource: ITextOutput): boolean => {
    if (!this.verificationService.sectionVertification(dataSource))
      return false;
    if (!this.verificationService.textOutput(dataSource))
      return false;
    return true;
  }
  firstConfirmDialog = (text: string): Promise<any> => {
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
  deleteSingleRow = async (place: ENInterfaces, id: number) => {
    const res = await this.ajaxReqWrapperService.postDataSourceById(place, id);
    this.utilsService.snackBarMessageSuccess(res.message);
    return true;
  }
  customizeSelectedColumns = (_selectCols: any[]) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }

}
