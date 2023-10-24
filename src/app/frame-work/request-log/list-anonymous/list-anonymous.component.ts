import { DateJalaliService } from 'services/date-jalali.service';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ManageServerService } from 'services/manage-server.service';
import { FactoryONE } from 'src/app/classes/factory';
import { ENRandomNumbers } from 'interfaces/enums.enum';

@Component({
  selector: 'app-list-anonymous',
  templateUrl: './list-anonymous.component.html',
  styleUrls: ['./list-anonymous.component.scss']
})
export class ListAnonymousComponent extends FactoryONE {
  constructor(
    private manageServerService: ManageServerService,
    public closeTabService: CloseTabService,
    private DateJalaliService: DateJalaliService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForRequestLogAnonymous = null;
    }
    this.insertToTimes();
  }
  insertToTimes = () => {
    let temp = this.DateJalaliService.getCurrentTime();
    const hour = temp.split(':').shift();
    const minute = temp.split(':').pop();

    this.closeTabService.saveDataForRequestLogAnonymousReq.fromTimeM = minute;
    this.closeTabService.saveDataForRequestLogAnonymousReq.fromTimeH = hour - 1;
    this.closeTabService.saveDataForRequestLogAnonymousReq.toTimeM = minute;
    this.closeTabService.saveDataForRequestLogAnonymousReq.toTimeH = hour;
    // add zero before single digits even if it is zero
    if (this.closeTabService.saveDataForRequestLogAnonymousReq.fromTimeH < ENRandomNumbers.ten) {
      this.closeTabService.saveDataForRequestLogAnonymousReq.fromTimeH = '0'.concat(this.closeTabService.saveDataForRequestLogAnonymousReq.fromTimeH.toString());
    }
    if (hour == '00') {
      this.closeTabService.saveDataForRequestLogAnonymousReq.fromTimeH = '23';
    }
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRequestLogAnonymous = await this.manageServerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestLogAnonymous, this.closeTabService.saveDataForRequestLogAnonymousReq);
  }
  verification = async () => {

    // join input values time 
    this.closeTabService.saveDataForRequestLogAnonymousReq.fromTime = this.closeTabService.saveDataForRequestLogAnonymousReq.fromTimeH + ':' + this.closeTabService.saveDataForRequestLogAnonymousReq.fromTimeM;
    this.closeTabService.saveDataForRequestLogAnonymousReq.toTime = this.closeTabService.saveDataForRequestLogAnonymousReq.toTimeH + ':' + this.closeTabService.saveDataForRequestLogAnonymousReq.toTimeM;
    console.log(1);
    console.log(this.closeTabService.saveDataForRequestLogAnonymousReq);

    const temp = this.manageServerService.verificationRequestLogInput(this.closeTabService.saveDataForRequestLogAnonymousReq);
    if (temp)
      this.connectToServer();
  }
  receiveFromDateJalali = ($event: string) => {
    this.closeTabService.saveDataForRequestLogAnonymousReq.jalaliDay = $event;
  }

}