import { EN_messages } from 'interfaces/enums.enum';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ManageServerService } from 'services/manage-server.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-activation-user',
  templateUrl: './activation-user.component.html',
  styleUrls: ['./activation-user.component.scss'],
  animations: [transitionAnimation]
})
export class ActivationUserComponent extends FactoryONE {
  userActivationLogDictionary: IDictionaryManager[] = [];

  constructor(
    public manageServerService: ManageServerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  connectToServer = async () => {
    console.log(this.closeTabService.saveDataForServerUserActivationReq);
    if (this.closeTabService.saveDataForServerUserActivationReq.userActivationLogTypes.length) {
      this.closeTabService.saveDataForServerUserActivation = await this.manageServerService.ajaxReqWrapperService.postDataSourceArray(ENInterfaces.requestLogUserActivation, this.closeTabService.saveDataForServerUserActivationReq);
    }
    else {
      this.closeTabService.utilsService.snackBarMessageWarn(EN_messages.insert_ActivationUser);
    }
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.connectToServer();
    }
    this.userActivationLogDictionary = await this.manageServerService.dictionaryWrapperService.getUserActivationLogTypesDictionary();
  }

}
