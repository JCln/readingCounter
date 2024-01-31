import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
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
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    this.insertToTimes();
  }
  insertToTimes = () => {
    const times = this.closeTabService.insertToTimes();
    this.closeTabService.requestLogUnAuthorizedReq = times;
  }
  connectToServer = async () => {
    this.closeTabService.requestLogUnAuthorized = await this.manageServerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestLogUnAuthorized, this.closeTabService.requestLogUnAuthorizedReq);
  }
  verification = async () => {
    const temp = this.manageServerService.verificationRequestLogInput(this.closeTabService.requestLogUnAuthorizedReq);
    if (temp)
      this.connectToServer();
  }
  receiveFromDateJalali = ($event: string) => {
    this.closeTabService.requestLogUnAuthorizedReq.jalaliDay = $event;
  }

}