import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ManageServerService } from 'services/manage-server.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-server-os-info',
  templateUrl: './server-os-info.component.html',
  styleUrls: ['./server-os-info.component.scss']
})
export class ServerOsInfoComponent extends FactoryONE {

  constructor(
    public manageServerService: ManageServerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    this.closeTabService.saveDataForOSInfo = await this.manageServerService.ajaxReqWrapperService.getDataSource(ENInterfaces.serverManagerOSInfo);
    // if (MathS.isNull(this.closeTabService.saveDataForOSInfo.cpuCoreCount)) {
    // }
  }

}