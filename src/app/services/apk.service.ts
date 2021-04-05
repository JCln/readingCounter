import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';

import { ENSnackBarColors, ENSnackBarTimes } from '../Interfaces/ioverall-config';
import { UtilsService } from './utils.service';

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
      this.interfaceManagerService.getAPKPreList().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  isNull = (): boolean => {
    if (this.utilsService.isNull(this.desc.versionName)) {
      this.snackWrapperService.openSnackBar('نام نسخه را وارد نمایید', ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    if (this.utilsService.isNull(this.desc.versionCode)) {
      this.snackWrapperService.openSnackBar('شماره نسخه را وارد نمایید', ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    if (this.utilsService.isNull(this.fileForm)) {
      this.snackWrapperService.openSnackBar('لطفا یک فایل apk انتخاب نمایید', ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  isInteger = (): boolean => {
    if (this.desc.versionCode.toString().includes('.')) {
      this.snackWrapperService.openSnackBar('شماره نسخه را بدون اعشار وارد نمایید', ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  isAPK = (): boolean => {
    if (this.fileForm[0].name.split('.').pop() !== 'apk') {
      this.snackWrapperService.openSnackBar('فرمت ارسالی باید فایل apk باشد', ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
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
    this.fileForm = filesList;
    this.desc = data;
    if (!this.vertification())
      return false;
    return true;
  }
  postTicket(): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', this.fileForm[0]);
    formData.append('versionCode', this.desc.versionCode);
    formData.append('versionName', this.desc.versionName);
    formData.append('description', this.desc.description);

    return this.interfaceManagerService.postAPK(formData)
      .pipe(
        map(response => response || {}),
        catchError((error: HttpErrorResponse) => {
          console.error("observable error: ", error);
          return throwError(error);
        })
      );
  }
}