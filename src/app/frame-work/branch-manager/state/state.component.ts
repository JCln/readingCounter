import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IBranchState } from 'interfaces/i-branch';
import { BranchesVerificationService } from 'services/branches-verification.service';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent extends FactoryONE {
  newRowLimit: number = 1;

  private branchStateColumns: string = 'branchState';
  _selectCols: any[] = [];
  _selectedColumns: any[];

  clonedProducts: { [s: string]: IBranchState; } = {};

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    public columnManager: ColumnManager,
    public branchesVerificationService: BranchesVerificationService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (!this.closeTabService.branchState) {
      this.closeTabService.branchState = await this.closeTabService.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.branchStateGet);
    }
    this.defaultAddStatus();
    this.insertSelectedColumns();
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  insertSelectedColumns = () => {
    this._selectCols = this.columnManager.getColumnsMenus(this.branchStateColumns);
    this._selectedColumns = this.columnManager.customizeSelectedColumns(this._selectCols);
  }
  testChangedValue() {
    this.newRowLimit = 2;
  }
  newRow(): IBranchState {
    return {
      id: 0,
      title: '',
      isActive: false,
      isNew: true
    };
  }
  onRowEditInit(dataSource: IBranchState) {
    // this.insertSelectedColumns();
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditCancel(dataSource: object) {
    this.newRowLimit = 1;
    this.closeTabService.branchState[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
    delete this.closeTabService.branchState[dataSource['dataSource'].id];
    if (dataSource['dataSource'].isNew)
      this.closeTabService.branchState.shift();
  }
  removeRow = async (dataSource: IBranchState) => {
    this.newRowLimit = 1;

    if (!this.branchesVerificationService.stateVerification(dataSource['dataSource']))
      return;

    const confirmed = await this.branchesService.firstConfirmDialog('عنوان: ' + dataSource['dataSource'].title);
    if (!confirmed) return;

    const res = await this.closeTabService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.branchStateRemove, dataSource['dataSource']);

    if (res) {
      this.closeTabService.utilsService.snackBarMessageSuccess(res.message);
      this.closeTabService.branchState[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      delete this.closeTabService.branchState[dataSource['dataSource'].id];
      this.refreshTable();
    }
  }
  refetchTable = (index: number) => this.closeTabService.branchState = this.closeTabService.branchState.slice(0, index).concat(this.closeTabService.branchState.slice(index + 1));
  async onRowEditSave(dataSource: object) {
    this.newRowLimit = 1;
    if (!this.branchesVerificationService.stateVerification(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.closeTabService.branchState.shift();
        return;
      }
      this.closeTabService.branchState[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (!dataSource['dataSource'].id) {
      this.onRowAdd(dataSource['dataSource'], dataSource['ri']);
    }
    else {
      const a = await this.closeTabService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.branchStateEdit, dataSource['dataSource']);
      if (a) {
        this.refreshTable();
      }
      else {
        this.refetchTable(dataSource['ri']);
      }
    }
  }
  private async onRowAdd(dataSource: IBranchState, rowIndex: number) {
    const a = await this.closeTabService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.branchStateAdd, dataSource);
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
