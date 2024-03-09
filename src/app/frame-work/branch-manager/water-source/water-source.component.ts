import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IWaterSource } from 'interfaces/i-branch';
import { BranchesVerificationService } from 'services/branches-verification.service';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-water-source',
  templateUrl: './water-source.component.html',
  styleUrls: ['./water-source.component.scss']
})
export class WaterSourceComponent extends FactoryONE {
  clonedProducts: { [s: string]: IWaterSource; } = {};
  private waterSourceColumns: string = 'waterSource';
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
    this.closeTabService.waterSource = await this.branchesService.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.waterSourceGet);
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.waterSource)) {
      this.callAPI();
    }
  }
  columnSelectedMenuDefault = () => {
    this._selectCols = this.branchesService.columnManager.getColumnsMenus(this.waterSourceColumns);
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
  refetchTable = (index: number) => this.closeTabService.waterSource = this.closeTabService.waterSource.slice(0, index).concat(this.closeTabService.waterSource.slice(index + 1));
  removeRow = async (rowData: object) => {
    const a = await this.branchesService.firstConfirmDialog('عنوان: ' + rowData['dataSource'].title);
    if (a) {
      await this.branchesService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.waterSourceRemove, rowData['dataSource']);
      this.refetchTable(rowData['ri']);
      this.callAPI();
    }
  }
  onRowEditSave = async (dataSource: IWaterSource) => {
    this.defaultAddStatus();

    if (!this.branchesVerificationService.stateVerification(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.closeTabService.waterSource.shift();
        return;
      }
      this.closeTabService.waterSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }

    if (dataSource['dataSource'].isNew) {
      this.onRowAdd(dataSource['dataSource'], dataSource['ri']);
    }
    else {
      const res = await this.branchesService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.waterSourceEdit, dataSource['dataSource']);
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }
  private async onRowAdd(dataSource: IWaterSource, rowIndex: number) {
    const res = await this.branchesService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.waterSourceAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.refetchTable(rowIndex);
      this.callAPI();
    }
  }

  newRow(): IWaterSource {
    return { id: 0, title: '', isActive: false, isNew: true };
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  testChangedValue() { this.newRowLimit = 2; }
}