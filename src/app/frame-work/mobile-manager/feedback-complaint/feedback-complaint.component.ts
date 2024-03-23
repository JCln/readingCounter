import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IFeedbackType } from 'interfaces/imobile-manager';
import { CloseTabService } from 'services/close-tab.service';
import { MobileAppService } from 'services/mobile-app.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-feedback-complaint',
  templateUrl: './feedback-complaint.component.html',
  styleUrls: ['./feedback-complaint.component.scss']
})
export class FeedbackComplaintComponent extends FactoryONE {
  newRowLimit: number = 1;
  readonly isComplaint: boolean = true;
  readonly feedbackComplaintColumns: string = 'feedbackComplaint';

  clonedProducts: { [s: string]: IFeedbackType; } = {};

  constructor(
    public closeTabService: CloseTabService,
    public mobileAppService: MobileAppService,
  ) {
    super();
  }

  callAPI = async () => {
    this.closeTabService.mobileManagerFeedbackTypeIsComplaint = await this.mobileAppService.ajaxReqWrapperService.getDataSource(ENInterfaces.feedbackTypeManagerGetC);
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.mobileManagerFeedbackTypeIsComplaint)) {
      this.callAPI();
    }
    this.defaultAddStatus();
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  testChangedValue() {
    this.newRowLimit = 2;
  }
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
    this.closeTabService.mobileManagerFeedbackTypeIsComplaint[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
    delete this.closeTabService.mobileManagerFeedbackTypeIsComplaint[dataSource['dataSource'].id];
    if (dataSource['dataSource'].isNew)
      this.closeTabService.mobileManagerFeedbackTypeIsComplaint.shift();
  }
  removeRow = async (dataSource: IFeedbackType) => {
    this.newRowLimit = 1;

    if (!this.mobileAppService.verificationComplaint(dataSource['dataSource']))
      return;

    const confirmed = await this.mobileAppService.firstConfirmDialog('عنوان: ' + dataSource['dataSource'].title);
    if (!confirmed) return;

    const res = await this.mobileAppService.ajaxReqWrapperService.postDataSourceById(ENInterfaces.feedbackTypeManagerRemoveC, dataSource['dataSource'].id);

    if (res) {
      this.mobileAppService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }
  async onRowEditSave(dataSource: object) {
    this.newRowLimit = 1;
    if (!this.mobileAppService.verificationComplaint(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.closeTabService.mobileManagerFeedbackTypeIsComplaint.shift();
        return;
      }
      this.closeTabService.mobileManagerFeedbackTypeIsComplaint[dataSource['ri']] =
        this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (!dataSource['dataSource'].id) {
      this.onRowAdd(dataSource['dataSource'], dataSource['ri']);
    }
    else {
      const res = await this.mobileAppService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.feedbackTypeManagerEditC, dataSource['dataSource']);
      if (res) {
        this.mobileAppService.utilsService.snackBarMessageSuccess(res.message);
        this.callAPI();
      }
    }
  }
  private async onRowAdd(dataSource: IFeedbackType, rowIndex: number) {
    const res = await this.mobileAppService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.feedbackTypeManagerAddC, dataSource);
    if (res) {
      this.mobileAppService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }

}
