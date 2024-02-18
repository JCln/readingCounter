import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
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

  constructor(
    public manageServerService: ManageServerService,
    public closeTabService: CloseTabService,
    private dateJalaliService: DateJalaliService
  ) {
    super();
  }

  classWrapper = async () => { }

  linkToElmah = (body: string) => {
    this.manageServerService.linkToElmah(body);
  }
  convertLoginTime = () => {
    this.closeTabService.saveDataForServerErrors.forEach(item => {
      item.insertDateTime = this.dateJalaliService.getDate(item.insertDateTime) + '   ' + this.dateJalaliService.getTime(item.insertDateTime);
    })
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForServerErrors = await this.manageServerService.ajaxReqWrapperService.postDataSourceArray(ENInterfaces.serverManagerErrors, this.closeTabService.serverErrorsSelectedErrors);
    this.convertLoginTime();
  }
}
