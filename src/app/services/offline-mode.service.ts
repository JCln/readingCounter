import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { UtilsService } from 'services/utils.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENSnackBarColors, EN_messages } from 'interfaces/enums.enum';
import { Observable } from 'rxjs/internal/Observable';

import { MathS } from '../classes/math-s';
import { Search } from '../classes/search';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { ISingleReadingCounterReq } from 'interfaces/isearchs';
import { IIOPolicy } from 'interfaces/iserver-manager';


@Injectable({
  providedIn: 'root'
})
export class OfflineModeService {
  private fileForm: FileList;
  private desc: any;

  loadForm = {
    zoneId: 0,
    counterReaderId: ''
  }

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    private utilsService: UtilsService,
    public dictionaryWrapperService: DictionaryWrapperService
  ) { }

  getSearchTypes = (): Search[] => {
    return [
      Search.eshterak,
      Search.radif,
      Search.readCode,
      Search.billId,
    ]
  }
  isNull = (): boolean => {
    if (MathS.isNull(this.fileForm)) {
      this.utilsService.snackBarMessage(EN_messages.should_insert_ZIP, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  isZIPOfflineTxtOut = (): boolean => {
    if (this.fileForm[0].name.split('.').pop() !== 'zip') {
      this.utilsService.snackBarMessage(EN_messages.should_insert_ZIP, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  vertificationOfflineTxtOut = (): boolean => {
    if (!this.isNull())
      return false;
    if (!this.isZIPOfflineTxtOut())
      return false;
    return true;
  }
  vertificationLoadManual = (): boolean => {
    if (MathS.isNull(this.loadForm.zoneId)) {
      this.utilsService.snackBarMessage(EN_messages.insert_zone, ENSnackBarColors.warn);
      return false;
    }
    if (MathS.isNull(this.loadForm.counterReaderId)) {
      this.utilsService.snackBarMessage(EN_messages.insert_CounterReader, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  checkVertiticationOfflineTxtOut = (body: any, filesList: FileList, data: any): boolean => {
    this.fileForm = filesList;
    this.desc = data;
    if (MathS.isNull(body.zoneId)) {
      this.utilsService.snackBarMessage(EN_messages.insert_zone, ENSnackBarColors.warn);
      return false;
    }
    if (MathS.isNull(body.counterReaderId)) {
      this.utilsService.snackBarMessage(EN_messages.insert_CounterReader, ENSnackBarColors.warn);
      return false;
    }
    if (!this.vertificationOfflineTxtOut())
      return false;
    return true;
  }
  vertificationSingleReadingRequest = (dataSource: ISingleReadingCounterReq): boolean => {
    if (MathS.isNull(dataSource.searchBy)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_searchType);
      return false;
    }
    if (MathS.isNull(dataSource.item)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_value);
      return false;
    }
    return true;
  }
  showSuccessMessage = (message: string) => {
    this.utilsService.snackBarMessage(message, ENSnackBarColors.success);
  }
  postTicketOfflineTxtOut = (body: any): Observable<any> => {
    const formData: FormData = new FormData();

    formData.append('file', this.fileForm[0]);
    formData.append('userId', body.counterReaderId);
    return this.ajaxReqWrapperService.postBodyProgress(ENInterfaces.offloadManual, formData);
  }
  postTicketFileUploadSingle = (body: any, filesList: FileList): Observable<any> => {
    const formData: FormData = new FormData();

    formData.append('file', filesList[0]);
    formData.append('onOffLoadId', body.onOffLoadId);
    formData.append('description', body.description);

    return this.ajaxReqWrapperService.postBodyProgress(ENInterfaces.fileUploadSingle, formData);
  }

}
