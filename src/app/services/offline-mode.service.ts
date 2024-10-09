import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { UtilsService } from 'services/utils.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { Observable } from 'rxjs/internal/Observable';

import { Search } from '../classes/search';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { IOService } from './io.service';
import { VerificationService } from './verification.service';


@Injectable({
  providedIn: 'root'
})
export class OfflineModeService {

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public utilsService: UtilsService,
    public dictionaryWrapperService: DictionaryWrapperService,
    public iOService: IOService,
    public verificationService: VerificationService
  ) { }

  getSearchTypes = (): Search[] => {
    return [
      Search.eshterak,
      Search.radif,
      Search.readCode,
      Search.billId,
    ]
  }
  postTicketOfflineTxtOut = (body: any, fileForm: FileList): Observable<any> => {
    const formData: FormData = new FormData();

    formData.append('file', fileForm[0]);
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