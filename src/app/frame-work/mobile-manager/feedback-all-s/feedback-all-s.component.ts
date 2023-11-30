import { MobileAppService } from 'services/mobile-app.service';
import { Component } from '@angular/core';
import { FactoryONE } from 'src/app/classes/factory';
import { CloseTabService } from 'services/close-tab.service';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { transitionAnimation } from 'src/app/directives/animation.directive';
import { IFeedbackList } from 'interfaces/imobile-manager';
import { EN_messages } from 'interfaces/enums.enum';

@Component({
  selector: 'app-feedback-all-s',
  templateUrl: './feedback-all-s.component.html',
  styleUrls: ['./feedback-all-s.component.scss'],
  animations: [transitionAnimation]
})
export class FeedbackAllSComponent extends FactoryONE {

  constructor(
    public mobileAppService: MobileAppService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.mobileManagerFeedbackAllS = null;
      this.verification();
    }
  }
  verification = async () => {
    const temp = this.mobileAppService.dateValidation(this.closeTabService.mobileManagerFeedbackAllSReq);
    if (temp) {
      this.connectToServer();
    }
  }

  connectToServer = async () => {
    this.closeTabService.mobileManagerFeedbackAllS = await this.mobileAppService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.feedbackManagerAllS, this.closeTabService.mobileManagerFeedbackAllSReq);
  }
  showDescription = async (rowDataAndIndex: IFeedbackList) => {
    const config = {
      messageTitle: EN_messages.userDesc + '(' + rowDataAndIndex.insertDayJalali + ')',
      messageTitleTwo: rowDataAndIndex.description,
      minWidth: '19rem',
      isInput: false,
      isDelete: false,
      icon: 'pi pi-info-circle'
    }
    await this.closeTabService.utilsService.firstConfirmDialog(config);
  }

}
