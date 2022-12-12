import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { Observable } from 'rxjs/internal/Observable';

import { MathS } from '../classes/math-s';
import { Search } from '../classes/search';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';
import { SnackWrapperService } from './snack-wrapper.service';

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

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private snackWrapperService: SnackWrapperService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  getSearchTypes = (): Search[] => {
    return [
      Search.eshterak,
      Search.radif,
      Search.readCode,
      Search.billId,
    ]
  }
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getLatestOnOffloadId = (body: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(ENInterfaces.getLatestOnOffloadId, body).toPromise().then(res => {
        resolve(res);
      })
    })
  }
  getUserCounterReaders = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getUserCounterReaderDictionary(zoneId);
  }
  isNull = (): boolean => {
    if (MathS.isNull(this.fileForm)) {
      this.snackWrapperService.openSnackBar(EN_messages.should_insert_ZIP, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    return true;
  }
  isZIPOfflineTxtOut = (): boolean => {
    if (this.fileForm[0].name.split('.').pop() !== 'zip') {
      this.snackWrapperService.openSnackBar(EN_messages.should_insert_ZIP, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
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
      this.snackWrapperService.openSnackBar(EN_messages.insert_zone, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (MathS.isNull(this.loadForm.counterReaderId)) {
      this.snackWrapperService.openSnackBar(EN_messages.insert_CounterReader, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }

    return true;
  }
  checkVertiticationOfflineTxtOut = (filesList: FileList, data: any): boolean => {
    this.fileForm = filesList;
    this.desc = data;
    if (!this.vertificationOfflineTxtOut())
      return false;
    return true;
  }
  checkVertiticationFileUploadSingle = (): boolean => {
    if (MathS.isNull(this.fileUploadSingle.searchBy)) {
      this.snackWrapperService.openSnackBar(EN_messages.insert_searchType, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (MathS.isNull(this.fileUploadSingle.item.trim())) {
      this.snackWrapperService.openSnackBar(EN_messages.insert_value, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (MathS.isNull(this.fileUploadSingleForm)) {
      this.snackWrapperService.openSnackBar(EN_messages.insert_Image, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    if (
      this.fileUploadSingleForm[0].name.split('.').pop() === 'jpg'
      || this.fileUploadSingleForm[0].name.split('.').pop() === 'JPG'
      || this.fileUploadSingleForm[0].name.split('.').pop() === 'JPEG'
      || this.fileUploadSingleForm[0].name.split('.').pop() === 'jpeg') {
      return true;
    }
    else {
      this.snackWrapperService.openSnackBar(EN_messages.should_insert_JPG, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
    // return true;
  }
  getOfflineManual = (userName: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETBLOB(ENInterfaces.loadManual + '?userId=' + userName).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  showSuccessMessage = (message: string) => {
    this.snackWrapperService.openSnackBar(message, ENSnackBarTimes.sevenMili, ENSnackBarColors.success);
  }
  postTicketOfflineTxtOut = (): Observable<any> => {
    const formData: FormData = new FormData();

    formData.append('file', this.fileForm[0]);

    return this.interfaceManagerService.POSTBODYPROGRESS(ENInterfaces.offloadManual, formData);
  }
  postTicketFileUploadSingle = (filesList: FileList): Observable<any> => {
    const formData: FormData = new FormData();

    formData.append('file', filesList[0]);
    formData.append('onOffLoadId', this.fileUploadSingleReq.onOffLoadId);
    formData.append('description', this.fileUploadSingleReq.description);

    return this.interfaceManagerService.POSTBODYPROGRESS(ENInterfaces.fileUploadSingle, formData);
  }

}
