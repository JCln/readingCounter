import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { ManageServerService } from 'services/manage-server.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent extends FactoryONE {
  constructor(
    private manageServerService: ManageServerService,
    public closeTabService: CloseTabService,
    private dateJalaliService: DateJalaliService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForRequestLogListUser = null;
    }
    this.insertToTimes();
  }
  insertToTimes = () => {
    let temp = this.dateJalaliService.getCurrentTime();
    const hour = temp.split(':').shift();
    const minute = temp.split(':').pop();

    this.closeTabService.saveDataForRequestLogListUserReq.fromTimeM = minute;
    this.closeTabService.saveDataForRequestLogListUserReq.fromTimeH = hour - 1;
    this.closeTabService.saveDataForRequestLogListUserReq.toTimeM = minute;
    this.closeTabService.saveDataForRequestLogListUserReq.toTimeH = hour;
    // add zero before single digits even if it is zero
    if (this.closeTabService.saveDataForRequestLogListUserReq.fromTimeH < 10) {
      this.closeTabService.saveDataForRequestLogListUserReq.fromTimeH = '0'.concat(this.closeTabService.saveDataForRequestLogListUserReq.fromTimeH.toString());
    }
    if (hour == '00') {
      this.closeTabService.saveDataForRequestLogAnonymousReq.fromTimeH = '23';
    }
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRequestLogListUser = await this.manageServerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestLogUser, this.closeTabService.saveDataForRequestLogListUserReq);
  }
  verification = async () => {

    // join input values time 
    this.closeTabService.saveDataForRequestLogListUserReq.fromTime = this.closeTabService.saveDataForRequestLogListUserReq.fromTimeH + ':' + this.closeTabService.saveDataForRequestLogListUserReq.fromTimeM;
    this.closeTabService.saveDataForRequestLogListUserReq.toTime = this.closeTabService.saveDataForRequestLogListUserReq.toTimeH + ':' + this.closeTabService.saveDataForRequestLogListUserReq.toTimeM;

    const temp = this.manageServerService.verificationRequestLogInput(this.closeTabService.saveDataForRequestLogListUserReq);
    if (temp)
      this.connectToServer();
  }
  receiveFromDateJalali = ($event: string) => {
    this.closeTabService.saveDataForRequestLogListUserReq.jalaliDay = $event;
  }

  refreshTable = () => {
    this.verification();
  }

}