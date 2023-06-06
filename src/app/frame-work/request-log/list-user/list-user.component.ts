import { Component, OnInit } from '@angular/core';
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
    const temp = this.dateJalaliService.getCurrentTime();
    this.closeTabService.saveDataForRequestLogListUserReq.fromTimeM = temp.toString().split(':').pop();
    this.closeTabService.saveDataForRequestLogListUserReq.fromTimeH = temp.toString().split(':').shift() - 1;
    this.closeTabService.saveDataForRequestLogListUserReq.toTimeM = temp.toString().split(':').pop();
    this.closeTabService.saveDataForRequestLogListUserReq.toTimeH = temp.toString().split(':').shift();
    if (temp.toString().split(':').shift() == '0') {
      this.closeTabService.saveDataForRequestLogListUserReq.fromTimeH = '23';
      this.closeTabService.saveDataForRequestLogListUserReq.toTimeH = '24';
    }
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRequestLogListUser = await this.manageServerService.postBody(ENInterfaces.requestLogUser, this.closeTabService.saveDataForRequestLogListUserReq);
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