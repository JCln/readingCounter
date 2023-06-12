import { DateJalaliService } from 'services/date-jalali.service';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ManageServerService } from 'services/manage-server.service';
import { FactoryONE } from 'src/app/classes/factory';

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
    const temp = this.DateJalaliService.getCurrentTime();
    this.closeTabService.saveDataForRequestLogAnonymousReq.fromTimeM = temp.toString().split(':').pop();
    this.closeTabService.saveDataForRequestLogAnonymousReq.fromTimeH = temp.toString().split(':').shift() - 1;
    this.closeTabService.saveDataForRequestLogAnonymousReq.toTimeM = temp.toString().split(':').pop();
    this.closeTabService.saveDataForRequestLogAnonymousReq.toTimeH = temp.toString().split(':').shift();
    if (temp.toString().split(':').shift() == '0') {
      this.closeTabService.saveDataForRequestLogAnonymousReq.fromTimeH = '23';
      this.closeTabService.saveDataForRequestLogAnonymousReq.toTimeH = '24';
    }
    if (temp.toString().split(':').shift() == '10') {
      this.closeTabService.saveDataForRequestLogAnonymousReq.fromTimeH = '09';
    }
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRequestLogAnonymous = await this.manageServerService.postBody(ENInterfaces.requestLogAnonymous, this.closeTabService.saveDataForRequestLogAnonymousReq);
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