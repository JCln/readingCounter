import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { UtilsService } from 'services/utils.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENSnackBarColors, ENSnackBarTimes, EN_messages } from 'interfaces/enums.enum';
import { Observable } from 'rxjs/internal/Observable';

import { MathS } from '../classes/math-s';
import { Search } from '../classes/search';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { ISingleReadingCounterReq } from 'interfaces/isearchs';
import { IIOPolicy } from 'interfaces/iserver-manager';

interface IUploadForm {
  file: any,
  description: string,
  onOffLoadId: string,
}

@Injectable({
  providedIn: 'root'
})
export class OfflineModeService {
  private fileForm: FileList;
  private desc: any;
  fileUploadSingleForm: FileList;

  loadForm = {
    zoneId: 0,
    counterReaderId: ''
  }
  fileUploadSingle = {
    searchBy: 1,
    item: '',
    searchType: []
  }
  fileUploadSingleReq: IUploadForm = {
    file: File,
    description: '',
    onOffLoadId: ''
  }
  offlineTextOut = {
    zoneId: null,
    counterReaderId: '',
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
      this.utilsService.snackBarMessage(EN_messages.should_insert_ZIP, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  isZIPOfflineTxtOut = (): boolean => {
    if (this.fileForm[0].name.split('.').pop() !== 'zip') {
      this.utilsService.snackBarMessage(EN_messages.should_insert_ZIP, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
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
      this.utilsService.snackBarMessage(EN_messages.insert_zone, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (MathS.isNull(this.loadForm.counterReaderId)) {
      this.utilsService.snackBarMessage(EN_messages.insert_CounterReader, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  checkVertiticationOfflineTxtOut = (filesList: FileList, data: any): boolean => {
    this.fileForm = filesList;
    this.desc = data;
    if (MathS.isNull(this.offlineTextOut.zoneId)) {
      this.utilsService.snackBarMessage(EN_messages.insert_zone, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (MathS.isNull(this.offlineTextOut.counterReaderId)) {
      this.utilsService.snackBarMessage(EN_messages.insert_CounterReader, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (!this.vertificationOfflineTxtOut())
      return false;
    return true;
  }
  checkVertiticationFileUploadSingle = (ioPolicy: IIOPolicy): boolean => {
    const allowedExtension = ['image/jpeg', 'image/jpg', 'image/png'];
    const allowedNames = ['jpeg', 'jpg', 'png'];

    if (MathS.isNull(this.fileUploadSingle.searchBy)) {
      this.utilsService.snackBarMessage(EN_messages.insert_searchType, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (MathS.isNull(this.fileUploadSingle.item.toString().trim())) {
      this.utilsService.snackBarMessage(EN_messages.insert_value, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (MathS.isNull(this.fileUploadSingleForm)) {
      this.utilsService.snackBarMessage(EN_messages.insert_Image, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (allowedExtension.indexOf(this.fileUploadSingleForm[0].type) == -1) {
      this.utilsService.snackBarMessage(EN_messages.insertIsNotImage, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (allowedNames.indexOf(this.fileUploadSingleForm[0].name.split('.').pop().toLowerCase()) == -1) {
      this.utilsService.snackBarMessage(EN_messages.should_insert_image, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (this.fileUploadSingleForm[0].size / 1024 > ioPolicy.inputMaxSizeKb) {
      this.utilsService.snackBarMessage(EN_messages.uploadMaxCountPassed, ENSnackBarTimes.sevenMili, ENSnackBarColors.warn);
      return false;
    }

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
    this.utilsService.snackBarMessage(message, ENSnackBarTimes.sevenMili, ENSnackBarColors.success);
  }
  postTicketOfflineTxtOut = (): Observable<any> => {
    const formData: FormData = new FormData();

    formData.append('file', this.fileForm[0]);
    formData.append('userId', this.offlineTextOut.counterReaderId);
    return this.ajaxReqWrapperService.postBodyProgress(ENInterfaces.offloadManual, formData);
  }
  postTicketFileUploadSingle = (filesList: FileList): Observable<any> => {
    const formData: FormData = new FormData();

    formData.append('file', filesList[0]);
    formData.append('onOffLoadId', this.fileUploadSingleReq.onOffLoadId);
    formData.append('description', this.fileUploadSingleReq.description);

    return this.ajaxReqWrapperService.postBodyProgress(ENInterfaces.fileUploadSingle, formData);
  }

}
