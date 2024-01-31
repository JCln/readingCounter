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
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    this.insertToTimes();
  }
  insertToTimes = () => {
    const times = this.closeTabService.insertToTimes();
    this.closeTabService.saveDataForRequestLogAnonymousReq = times;
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRequestLogAnonymous = await this.manageServerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestLogAnonymous, this.closeTabService.saveDataForRequestLogAnonymousReq);
  }
  verification = async () => {
    const temp = this.manageServerService.verificationRequestLogInput(this.closeTabService.saveDataForRequestLogAnonymousReq);
    if (temp)
      this.connectToServer();
  }
  receiveFromDateJalali = ($event: string) => {
    this.closeTabService.saveDataForRequestLogAnonymousReq.jalaliDay = $event;
  }

}