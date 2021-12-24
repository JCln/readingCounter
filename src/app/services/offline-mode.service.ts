import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { Observable } from 'rxjs/internal/Observable';

import { MathS } from '../classes/math-s';
import { InterfaceManagerService } from './interface-manager.service';
import { SnackWrapperService } from './snack-wrapper.service';


@Injectable({
  providedIn: 'root'
})
export class OfflineModeService {
  private fileForm: FileList;
  private desc: any;

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private snackWrapperService: SnackWrapperService
  ) { }

  isNull = (): boolean => {
    // if (MathS.isNull(this.desc.userName)) {
    //   this.snackWrapperService.openSnackBar(EN_messages.insert_userName, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
    //   return false;
    // }
    if (MathS.isNull(this.fileForm)) {
      this.snackWrapperService.openSnackBar(EN_messages.should_insert_ZIP, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  isZIP = (): boolean => {
    if (this.fileForm[0].name.split('.').pop() !== 'zip') {
      this.snackWrapperService.openSnackBar(EN_messages.should_insert_ZIP, ENSnackBarTimes.threeMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  vertification = (): boolean => {
    if (!this.isNull())
      return false;
    if (!this.isZIP())
      return false;
    return true;
  }
  vertificationLoadManual = (userNameQuery: string): boolean => {
    if (MathS.isNull(userNameQuery)) {
      this.snackWrapperService.openSnackBar(EN_messages.insert_value, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  checkVertitication = (filesList: FileList, data: any): boolean => {
    this.fileForm = filesList;
    this.desc = data;
    if (!this.vertification())
      return false;
    return true;
  }
  getOfflineManual = (userName: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETBLOB(ENInterfaces.loadManual +  '?userName=' + userName).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  showSuccessMessage = (message: string) => {
    this.snackWrapperService.openSnackBar(message, ENSnackBarTimes.sevenMili, ENSnackBarColors.success);
  }
  postTicket = (): Observable<any> => {
    const formData: FormData = new FormData();

    formData.append('file', this.fileForm[0]);

    return this.interfaceManagerService.POSTBODYPROGRESS(ENInterfaces.offloadManual, formData);
  }

}
