import { UtilsService } from 'services/utils.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { Observable } from 'rxjs/internal/Observable';

import { MathS } from '../classes/math-s';
import { Search } from '../classes/search';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';
import { ISingleReadingCounterReq } from 'interfaces/isearchs';

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
  postDataSource = (method: ENInterfaces, body: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(method, body).toPromise().then(res => {
        resolve(res);
      })
    })
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
    if (!this.vertificationOfflineTxtOut())
      return false;
    return true;
  }
  checkVertiticationFileUploadSingle = (): boolean => {
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
    if (
      this.fileUploadSingleForm[0].name.split('.').pop().toLowerCase() === 'jpg' ||
      this.fileUploadSingleForm[0].name.split('.').pop().toLowerCase() === 'jpeg' ||
      this.fileUploadSingleForm[0].name.split('.').pop().toLowerCase() === 'png'
    ) {
      return true;
    }
    else {
      this.utilsService.snackBarMessage(EN_messages.should_insert_image, ENSnackBarTimes.fourMili, ENSnackBarColors.warn);
      return false;
    }
  }
  getOfflineManual = (userName: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETBLOB(ENInterfaces.loadManual + '?userId=' + userName).toPromise().then(res => {
        resolve(res);
      })
    });
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
