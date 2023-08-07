import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { MobileAppService } from 'services/mobile-app.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-feedback-all',
  templateUrl: './feedback-all.component.html',
  styleUrls: ['./feedback-all.component.scss'],
  animations: [transitionAnimation]
})
export class FeedbackAllComponent extends FactoryONE {

  constructor(
    public mobileAppService: MobileAppService,
    public closeTabService: CloseTabService
  ) {
    super();
  }
  connectToServer = async () => {
    this.closeTabService.mobileManagerFeedbackAllC = await this.mobileAppService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.feedbackManagerAllC, this.closeTabService.mobileManagerFeedbackAllCReq);
  }
  verification = async () => {
    const temp = this.mobileAppService.dateValidation(this.closeTabService.mobileManagerFeedbackAllCReq);
    if (temp) {
      this.connectToServer();
    }
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.mobileManagerFeedbackAllC = null;
      this.verification();
    }
  }

}
