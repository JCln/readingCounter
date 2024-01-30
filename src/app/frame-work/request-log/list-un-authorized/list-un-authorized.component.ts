import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENRandomNumbers } from 'interfaces/enums.enum';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { ManageServerService } from 'services/manage-server.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-list-un-authorized',
  templateUrl: './list-un-authorized.component.html',
  styleUrls: ['./list-un-authorized.component.scss']
})
export class ListUnAuthorizedComponent extends FactoryONE {
  constructor(
    private manageServerService: ManageServerService,
    public closeTabService: CloseTabService,
    private dateJalaliService: DateJalaliService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    this.insertToTimes();
  }
  insertToTimes = () => {
    let temp = this.dateJalaliService.getCurrentTime();
    const hour = temp.split(':').shift();
    const minute = temp.split(':').pop();

    this.closeTabService.requestLogUnAuthorizedReq.fromTimeM = minute;
    this.closeTabService.requestLogUnAuthorizedReq.fromTimeH = hour - 1;
    this.closeTabService.requestLogUnAuthorizedReq.toTimeM = minute;
    this.closeTabService.requestLogUnAuthorizedReq.toTimeH = hour;
    // add zero before single digits even if it is zero
    if (this.closeTabService.requestLogUnAuthorizedReq.fromTimeH < ENRandomNumbers.ten) {
      this.closeTabService.requestLogUnAuthorizedReq.fromTimeH = '0'.concat(this.closeTabService.requestLogUnAuthorizedReq.fromTimeH.toString());
    }
    if (hour == '24') {
      this.closeTabService.requestLogUnAuthorizedReq.toTimeH = '00';
    }
  }
  connectToServer = async () => {
    this.closeTabService.requestLogUnAuthorized = await this.manageServerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestLogUnAuthorized, this.closeTabService.requestLogUnAuthorizedReq);
  }
  verification = async () => {

    // join input values time 
    this.closeTabService.requestLogUnAuthorizedReq.fromTime = this.closeTabService.requestLogUnAuthorizedReq.fromTimeH + ':' + this.closeTabService.requestLogUnAuthorizedReq.fromTimeM;
    this.closeTabService.requestLogUnAuthorizedReq.toTime = this.closeTabService.requestLogUnAuthorizedReq.toTimeH + ':' + this.closeTabService.requestLogUnAuthorizedReq.toTimeM;

    const temp = this.manageServerService.verificationRequestLogInput(this.closeTabService.requestLogUnAuthorizedReq);
    if (temp)
      this.connectToServer();
  }
  receiveFromDateJalali = ($event: string) => {
    this.closeTabService.requestLogUnAuthorizedReq.jalaliDay = $event;
  }

}