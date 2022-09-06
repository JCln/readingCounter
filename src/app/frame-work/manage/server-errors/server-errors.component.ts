import { Component } from '@angular/core';
import { IManageServerErrorsRes } from 'interfaces/iserver-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ManageServerService } from 'services/manage-server.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-server-errors',
  templateUrl: './server-errors.component.html',
  styleUrls: ['./server-errors.component.scss']
})
export class ServerErrorsComponent extends FactoryONE {
  // important that selectedErrors default value should be []
  selectedErrors: any[] = [];
  dataSource: IManageServerErrorsRes[] = [];

  constructor(
    public manageServerService: ManageServerService,
    private closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (this.closeTabService.saveDataForServerErrors) {
      this.dataSource = this.closeTabService.saveDataForServerErrors;
    }
    else {
      this.connectToServer();
    }
  }
  ngOnInit(): void { }
  connectToServer = async () => {
    this.dataSource = await this.manageServerService.postArray(this.selectedErrors);
  }
  linkToElmah = (body: string) => {
    this.manageServerService.linkToElmah(body);
  }

}
