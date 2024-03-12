import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IBranchState } from 'interfaces/i-branch';
import { BranchesVerificationService } from 'services/branches-verification.service';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent extends FactoryONE {
  clonedProducts: { [s: string]: IBranchState; } = {};
  private branchStateColumns: string = 'branchState';
  newRowLimit: number = 1;
  _selectCols: any[];
  _selectedColumns: any[];

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    public branchesVerificationService: BranchesVerificationService
  ) {
    super();
  }
  callAPI = async () => {
    this.closeTabService.branchState = await this.branchesService.dictionaryWrapperService.getBranchStateDictionary(true);
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.branchState)) {
      this.callAPI();
    }
  }
  columnSelectedMenuDefault = () => {
    this._selectCols = this.branchesService.columnManager.getColumnsMenus(this.branchStateColumns);
    this._selectedColumns = this.branchesService.columnManager.customizeSelectedColumns(this._selectCols);
  }
  ngOnInit(): void {
    this.classWrapper();
    this.columnSelectedMenuDefault();
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  refetchTable = (index: number) => this.closeTabService.branchState = this.closeTabService.branchState.slice(0, index).concat(this.closeTabService.branchState.slice(index + 1));
  removeRow = async (rowData: object) => {
    const a = await this.branchesService.firstConfirmDialog('عنوان: ' + rowData['dataSource'].title);
    if (a) {
      await this.branchesService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.branchStateRemove, rowData['dataSource']);
      this.refetchTable(rowData['ri']);
      this.callAPI();
    }
  }
  onRowEditSave = async (dataSource: IBranchState) => {
    this.defaultAddStatus();


    if (!this.branchesVerificationService.stateVerification(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.closeTabService.branchState.shift();
        return;
      }
      this.closeTabService.branchState[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }

    if (dataSource['dataSource'].isNew) {
      this.onRowAdd(dataSource['dataSource'], dataSource['ri']);
    }
    else {
      const res = await this.branchesService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.branchStateEdit, dataSource['dataSource']);
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }
  private async onRowAdd(dataSource: IBranchState, rowIndex: number) {
    const res = await this.branchesService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.branchStateAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.refetchTable(rowIndex);
      this.callAPI();
    }
  }

  newRow(): IBranchState {
    return { id: 0, title: '', isActive: false, isNew: true };
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  testChangedValue() { this.newRowLimit = 2; }
}