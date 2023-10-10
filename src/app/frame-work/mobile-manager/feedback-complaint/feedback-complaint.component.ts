import { Component, Input } from '@angular/core';
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
  private feedbackComplaintColumns: string = 'feedbackComplaint';

  _selectCols: any[] = [];
  _selectedColumns: any[];

  clonedProducts: { [s: string]: IFeedbackType; } = {};

  constructor(
    public closeTabService: CloseTabService,
    public mobileAppService: MobileAppService,
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.mobileManagerFeedbackTypeIsComplaint = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (MathS.isNull(this.closeTabService.mobileManagerFeedbackTypeIsComplaint)) {
      this.closeTabService.mobileManagerFeedbackTypeIsComplaint = await this.mobileAppService.ajaxReqWrapperService.getDataSource(ENInterfaces.feedbackTypeManagerGetC);
    }
    this.defaultAddStatus();
    this.insertSelectedColumns();
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  insertSelectedColumns = () => {
    this._selectCols = this.mobileAppService.columnManager.columnSelectedMenus(this.feedbackComplaintColumns);
    this._selectedColumns = this.mobileAppService.columnManager.customizeSelectedColumns(this._selectCols);
  }
  testChangedValue() {
    this.newRowLimit = 2;
  }
  refetchTable = (index: number) => this.closeTabService.mobileManagerFeedbackTypeIsComplaint = this.closeTabService.mobileManagerFeedbackTypeIsComplaint.slice(0, index).concat(this.closeTabService.mobileManagerFeedbackTypeIsComplaint.slice(index + 1));
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
      this.closeTabService.mobileManagerFeedbackTypeIsComplaint[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      delete this.closeTabService.mobileManagerFeedbackTypeIsComplaint[dataSource['dataSource'].id];
      this.refetchTable(dataSource['ri']);
      this.refreshTable();
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
        this.refreshTable();
      }
      else {
        this.refetchTable(dataSource['ri']);
      }
    }
  }
  private async onRowAdd(dataSource: IFeedbackType, rowIndex: number) {
    const a = await this.mobileAppService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.feedbackTypeManagerAddC, dataSource);
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
