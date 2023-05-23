import { Component } from '@angular/core';
import { CloseTabService } from 'services/close-tab.service';
import { ManageServerService } from 'services/manage-server.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-server-errors',
  templateUrl: './server-errors.component.html',
  styleUrls: ['./server-errors.component.scss'],
  animations: [transitionAnimation]
})
export class ServerErrorsComponent extends FactoryONE {
  // important that selectedErrors default value should be []
  selectedErrors: any[] = [];

  constructor(
    public manageServerService: ManageServerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  connectToServer = async () => {
    this.closeTabService.saveDataForServerErrors = await this.manageServerService.postArray(this.selectedErrors);
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.connectToServer();
    }
  }
  linkToElmah = (body: string) => {
    this.manageServerService.linkToElmah(body);
  }

}
