import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
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
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async () => {
    this.insertToTimes();
  }
  insertToTimes = () => {
    const times = this.closeTabService.insertToTimes();
    this.closeTabService.saveDataForRequestLogListUserReq = times;
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForRequestLogListUser = await this.manageServerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestLogUser, this.closeTabService.saveDataForRequestLogListUserReq);
  }
  verification = async () => {
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