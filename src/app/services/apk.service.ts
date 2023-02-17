import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { Observable } from 'rxjs/internal/Observable';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { SnackWrapperService } from 'services/snack-wrapper.service';
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
    private snackWrapperService: SnackWrapperService,
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
      this.snackWrapperService.openSnackBar(EN_messages.insert_versionName, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    if (MathS.isNull(this.desc.versionCode)) {
      this.snackWrapperService.openSnackBar(EN_messages.insert_versionCode, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    if (MathS.isNull(this.fileForm)) {
      this.snackWrapperService.openSnackBar(EN_messages.should_insert_APK, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  isInteger = (): boolean => {
    if (this.desc.versionCode.toString().includes('.')) {
      this.snackWrapperService.openSnackBar(EN_messages.insert_without_decimal, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  isAPK = (): boolean => {
    if (this.fileForm[0].name.split('.').pop() !== 'apk') {
      this.snackWrapperService.openSnackBar(EN_messages.should_insert_APK, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
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
    this.snackWrapperService.openSnackBar(message, ENSnackBarTimes.sevenMili, color);
  }
  firstConfirmDialog = (): Promise<any> => {
    const a = {
      messageTitle: EN_messages.confirm_remove,
      minWidth: '19rem',
      isInput: false,
      isDelete: true
    }
    return this.utilsService.firstConfirmDialog(a);
  }

}