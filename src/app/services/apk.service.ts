import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { Observable } from 'rxjs/internal/Observable';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { UtilsService } from 'services/utils.service';

import { MathS } from '../classes/math-s';

@Injectable({
  providedIn: 'root'
})
export class ApkService {
  private fileForm: FileList;
  private desc: any;

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService
  ) { }

  getDataSource = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.APKPreList).subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  getlastAPK = (): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETBLOB(ENInterfaces.APKLast).toPromise().then(res => {
        resolve(res);
      })
    });
  }
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
  vertification = (): boolean => {
    if (!this.isNull())
      return false;
    if (!this.isInteger())
      return false;
    if (!this.isAPK())
      return false;
    return true;
  }
  checkVertitication = (filesList: FileList, data: any): boolean => {
    // ToDo: insert to values, not working perfectly unless
    this.fileForm = filesList;
    this.desc = data;
    if (!this.vertification())
      return false;
    return true;
  }
  postById = (method: ENInterfaces, id: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTById(method, id).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  postTicket = (): Observable<any> => {
    const formData: FormData = new FormData();

    formData.append('file', this.fileForm[0]);
    formData.append('versionCode', this.desc.versionCode);
    formData.append('versionName', this.desc.versionName);
    formData.append('description', this.desc.description);

    return this.interfaceManagerService.POSTBODYPROGRESS(ENInterfaces.APKUpload, formData);
  }
  showSuccessMessage = (message: string, color: ENSnackBarColors) => {
    this.utilsService.snackBarMessage(message, ENSnackBarTimes.sevenMili, color);
  }
  firstConfirmDialog = (): Promise<any> => {
    const a = {
      messageTitle: EN_messages.confirm_remove,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      icon: 'pi pi-trash'
    }
    return this.utilsService.firstConfirmDialog(a);
  }

}