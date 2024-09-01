import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENRandomNumbers, ENSnackBarColors, EN_messages } from 'interfaces/enums.enum';
import { Observable } from 'rxjs/internal/Observable';
import { UtilsService } from 'services/utils.service';

import { MathS } from '../classes/math-s';
import { IOService } from './io.service';

@Injectable({
  providedIn: 'root'
})
export class ApkService {
  private fileForm: FileList;
  private desc: any;

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public utilsService: UtilsService,
    public iOService: IOService
  ) { }

  isNull = (): boolean => {
    if (MathS.isNull(this.desc.versionName)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_versionName);
      return false;
    }
    if (MathS.isNull(this.desc.versionCode)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_versionCode);
      return false;
    }
    if (MathS.isNull(this.fileForm)) {
      this.utilsService.snackBarMessageWarn(EN_messages.should_insert_APK);
      return false;
    }
    return true;
  }
  isInteger = (): boolean => {
    if (this.desc.versionCode.toString().includes('.')) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_without_decimal);
      return false;
    }
    return true;
  }
  isAPK = (): boolean => {
    if (this.fileForm[0].name.split('.').pop() !== 'apk') {
      this.utilsService.snackBarMessageWarn(EN_messages.should_insert_APK);
      return false;
    }
    return true;
  }
  checkVertitication = (filesList: FileList, data: any): boolean => {
    // ToDo: insert to values, not working perfectly unless
    this.fileForm = filesList;
    this.desc = data;

    if (!this.isNull())
      return false;
    if (!this.isInteger())
      return false;
    if (!this.isAPK())
      return false;

    if (!this.iOService.policyAPKContent(this.fileForm)) {
      return false;
    }

    return true;
  }
  postTicket = (): Observable<any> => {
    const formData: FormData = new FormData();

    formData.append('file', this.fileForm[0]);
    formData.append('versionCode', this.desc.versionCode);
    formData.append('versionName', this.desc.versionName);
    formData.append('description', this.desc.description);

    return this.ajaxReqWrapperService.postBodyProgress(ENInterfaces.APKUpload, formData);
  }
  showSuccessMessage = (message: string, color: ENSnackBarColors) => {
    this.utilsService.snackBarMessage(message, color);
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

}