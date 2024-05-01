import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-get-uploaded',
  templateUrl: './get-uploaded.component.html',
  styleUrls: ['./get-uploaded.component.scss'],
  animations: [transitionAnimation]
})
export class GetUploadedComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService
  ) {
    super();
  }

  classWrapper = async () => { }
  connectToServer = async () => {
    this.closeTabService.getUploaded = await this.securityService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestLogGetUploaded, this.closeTabService.getUploadedReq);
  }
  verification = async () => {
    const temp = this.securityService.verificationService.verificationDates(this.closeTabService.getUploadedReq);
    if (temp)
      this.connectToServer();
  }

}