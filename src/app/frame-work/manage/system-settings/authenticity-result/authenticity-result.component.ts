import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ManageServerService } from 'services/manage-server.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-authenticity-result',
  templateUrl: './authenticity-result.component.html',
  styleUrls: ['./authenticity-result.component.scss']
})
export class AuthenticityResultComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public manageServerService: ManageServerService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.serverGetAuthenticity = [];
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (MathS.isNull(this.closeTabService.serverGetAuthenticity)) {
      this.closeTabService.serverGetAuthenticity = await this.manageServerService.ajaxReqWrapperService.getDataSource(ENInterfaces.serverManagerGetAuthenticity);
    }
  }

}