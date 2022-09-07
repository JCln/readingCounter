import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IRequestLog } from 'interfaces/iserver-manager';
import { CloseTabService } from 'services/close-tab.service';
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
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForRequestLog.data = null;
    }
    if (this.closeTabService.saveDataForRequestLog.data) {
      this.dataSource = this.closeTabService.saveDataForRequestLog.data;
    }
  }
  connectToServer = async () => {
    this.dataSource = await this.manageServerService.postBody(ENInterfaces.serverManagerRequestLog, this.closeTabService.saveDataForRequestLog.input);
    this.closeTabService.saveDataForRequestLog.data = this.dataSource;
  }
  verification = async () => {
    console.log(this.closeTabService.saveDataForRequestLog.input);

    const temp = this.manageServerService.verificationRequestLogInput(this.closeTabService.saveDataForRequestLog.input);
    if (temp)
      this.connectToServer();
  }
  receiveFromDateJalali = ($event: string) => {
    this.closeTabService.saveDataForRequestLog.input.jalaliDay = $event;
  }
  receiveFromTimeJalali = ($event: string) => {
    this.closeTabService.saveDataForRequestLog.input.fromTime = $event;
  }
  receiveToTimeJalali = ($event: string) => {
    this.closeTabService.saveDataForRequestLog.input.toTime = $event;
  }


}