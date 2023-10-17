import { Component, Input } from '@angular/core';
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
  private feedbackNotComplaintColumns: string = 'feedbackNotComplaint';

  _selectCols: any[] = [];
  _selectedColumns: any[];

  clonedProducts: { [s: string]: IFeedbackType; } = {};

  constructor(
    public closeTabService: CloseTabService,
    public mobileAppService: MobileAppService,
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.mobileManagerFeedbackTypeIsNotComplaint = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (MathS.isNull(this.closeTabService.mobileManagerFeedbackTypeIsNotComplaint)) {
      this.closeTabService.mobileManagerFeedbackTypeIsNotComplaint = await this.mobileAppService.ajaxReqWrapperService.getDataSource(ENInterfaces.feedbackTypeManagerGetS);
    }
    this.defaultAddStatus();
    this.insertSelectedColumns();
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  insertSelectedColumns = () => {
    this._selectCols = this.mobileAppService.columnManager.getColumnsMenus(this.feedbackNotComplaintColumns);
    this._selectedColumns = this.mobileAppService.columnManager.customizeSelectedColumns(this._selectCols);
  }
  testChangedValue() {
    this.newRowLimit = 2;
  }
  refetchTable = (index: number) => this.closeTabService.mobileManagerFeedbackTypeIsNotComplaint = this.closeTabService.mobileManagerFeedbackTypeIsNotComplaint.slice(0, index).concat(this.closeTabService.mobileManagerFeedbackTypeIsNotComplaint.slice(index + 1));
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
      this.refreshTable();
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
      const a = await this.mobileAppService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.feedbackTypeManagerEditS, dataSource['dataSource']);
      if (a) {
        this.refreshTable();
      }
      else {
        this.refetchTable(dataSource['ri']);
      }
    }
  }
  private async onRowAdd(dataSource: IFeedbackType, rowIndex: number) {
    const a = await this.mobileAppService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.feedbackTypeManagerAddS, dataSource);
    if (a) {
      this.refetchTable(rowIndex);
      this.refreshTable();
    }
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }

}
