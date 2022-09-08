import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IRequestLog } from 'interfaces/iserver-manager';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { ManageServerService } from 'services/manage-server.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-request-log',
  templateUrl: './request-log.component.html',
  styleUrls: ['./request-log.component.scss']
})
export class RequestLogComponent extends FactoryONE {
  dataSource: IRequestLog[] = [];

  constructor(
    private manageServerService: ManageServerService,
    public closeTabService: CloseTabService,
    private DateJalaliService: DateJalaliService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForRequestLog = null;
    }
    if (this.closeTabService.saveDataForRequestLog) {
      this.dataSource = this.closeTabService.saveDataForRequestLog;
    }
    this.insertToTimes();
  }
  insertToTimes = () => {
    const temp = this.DateJalaliService.getCurrentTime();
    this.closeTabService.saveDataForRequestLogReq.fromTimeM = temp.toString().split(':').pop();
    this.closeTabService.saveDataForRequestLogReq.fromTimeH = temp.toString().split(':').shift() - 1;
    this.closeTabService.saveDataForRequestLogReq.toTimeM = temp.toString().split(':').pop();
    this.closeTabService.saveDataForRequestLogReq.toTimeH = temp.toString().split(':').shift();
  }
  connectToServer = async () => {
    this.dataSource = await this.manageServerService.postBody(ENInterfaces.serverManagerRequestLog, this.closeTabService.saveDataForRequestLogReq);
    this.closeTabService.saveDataForRequestLog = this.dataSource;
  }
  verification = async () => {

    // join input values time 
    this.closeTabService.saveDataForRequestLogReq.fromTime = this.closeTabService.saveDataForRequestLogReq.fromTimeH + ':' + this.closeTabService.saveDataForRequestLogReq.fromTimeM;
    this.closeTabService.saveDataForRequestLogReq.toTime = this.closeTabService.saveDataForRequestLogReq.toTimeH + ':' + this.closeTabService.saveDataForRequestLogReq.toTimeM;

    const temp = this.manageServerService.verificationRequestLogInput(this.closeTabService.saveDataForRequestLogReq);
    if (temp)
      this.connectToServer();
  }
  receiveFromDateJalali = ($event: string) => {
    this.closeTabService.saveDataForRequestLogReq.jalaliDay = $event;
  }

  refreshTable = () => {
    this.verification();
  }

}