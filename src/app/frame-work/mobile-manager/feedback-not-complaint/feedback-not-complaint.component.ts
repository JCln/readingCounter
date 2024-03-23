import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IFeedbackType } from 'interfaces/imobile-manager';
import { CloseTabService } from 'services/close-tab.service';
import { MobileAppService } from 'services/mobile-app.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-feedback-not-complaint',
  templateUrl: './feedback-not-complaint.component.html',
  styleUrls: ['./feedback-not-complaint.component.scss']
})
export class FeedbackNotComplaintComponent extends FactoryONE {
  newRowLimit: number = 1;
  readonly isComplaint: boolean = false;
  readonly feedbackNotComplaintColumns: string = 'feedbackNotComplaint';

  clonedProducts: { [s: string]: IFeedbackType; } = {};

  constructor(
    public closeTabService: CloseTabService,
    public mobileAppService: MobileAppService,
  ) {
    super();
  }

  callAPI = async () => {
    this.closeTabService.mobileManagerFeedbackTypeIsNotComplaint = await this.mobileAppService.ajaxReqWrapperService.getDataSource(ENInterfaces.feedbackTypeManagerGetS);
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.mobileManagerFeedbackTypeIsNotComplaint)) {
      this.callAPI();
    }
    this.defaultAddStatus();
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  testChangedValue() {
    this.newRowLimit = 2;
  }
  // this is feedback NOT complaint
  newRow(): IFeedbackType {
    return {
      id: 0,
      title: '',
      isActive: true,
      isComplaint: this.isComplaint,
      isNew: true
    };
  }
  onRowEditInit(dataSource: IFeedbackType) {
    // this.insertSelectedColumns();
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditCancel(dataSource: object) {
    this.newRowLimit = 1;
    this.closeTabService.mobileManagerFeedbackTypeIsNotComplaint[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
    delete this.closeTabService.mobileManagerFeedbackTypeIsNotComplaint[dataSource['dataSource'].id];
    if (dataSource['dataSource'].isNew)
      this.closeTabService.mobileManagerFeedbackTypeIsNotComplaint.shift();
  }
  removeRow = async (dataSource: IFeedbackType) => {
    this.newRowLimit = 1;

    if (!this.mobileAppService.verificationComplaint(dataSource['dataSource']))
      return;

    const confirmed = await this.mobileAppService.firstConfirmDialog('عنوان: ' + dataSource['dataSource'].title);
    if (!confirmed) return;

    const res = await this.mobileAppService.ajaxReqWrapperService.postDataSourceById(ENInterfaces.feedbackTypeManagerRemoveS, dataSource['dataSource'].id);

    if (res) {
      this.mobileAppService.utilsService.snackBarMessageSuccess(res.message);
      this.closeTabService.mobileManagerFeedbackTypeIsNotComplaint[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      delete this.closeTabService.mobileManagerFeedbackTypeIsNotComplaint[dataSource['dataSource'].id];
      this.callAPI();
    }
  }
  async onRowEditSave(dataSource: object) {
    this.newRowLimit = 1;
    if (!this.mobileAppService.verificationComplaint(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.closeTabService.mobileManagerFeedbackTypeIsNotComplaint.shift();
        return;
      }
      this.closeTabService.mobileManagerFeedbackTypeIsNotComplaint[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (!dataSource['dataSource'].id) {
      this.onRowAdd(dataSource['dataSource'], dataSource['ri']);
    }
    else {
      const res = await this.mobileAppService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.feedbackTypeManagerEditS, dataSource['dataSource']);
      if (res) {
        this.mobileAppService.utilsService.snackBarMessageSuccess(res.message);
        this.callAPI();
      }
    }
  }
  private async onRowAdd(dataSource: IFeedbackType, rowIndex: number) {
    const res = await this.mobileAppService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.feedbackTypeManagerAddS, dataSource);
    if (res) {
      this.mobileAppService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }
  
}
