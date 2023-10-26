import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ManageServerService } from 'services/manage-server.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-authenticity-brief',
  templateUrl: './authenticity-brief.component.html',
  styleUrls: ['./authenticity-brief.component.scss']
})
export class AuthenticityBriefComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public manageServerService: ManageServerService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.serverAuthenticityBrief = [];
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (MathS.isNull(this.closeTabService.serverAuthenticityBrief)) {
      this.closeTabService.serverAuthenticityBrief = await this.manageServerService.ajaxReqWrapperService.getDataSource(ENInterfaces.serverManagerGetAuthenticityBrief);
    }
  }

}