import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOwnershipType } from 'interfaces/i-branch';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-ownership-type',
  templateUrl: './ownership-type.component.html',
  styleUrls: ['./ownership-type.component.scss']
})
export class OwnershipTypeComponent extends FactoryONE {
  clonedProducts: { [s: string]: IOwnershipType; } = {};
  readonly ownershipColumns: string = 'ownership';
  newRowLimit: number = 1;

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }
  callAPI = async () => {
    this.closeTabService.ownershipType = await this.branchesService.dictionaryWrapperService.getOwnershipTypeDictionary(true);
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.ownershipType)) {
      this.callAPI();
    }
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  removeRow = async (rowData: object) => {
    const a = await this.branchesService.firstConfirmDialog('عنوان: ' + rowData['dataSource'].title);
    if (a) {
      await this.branchesService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ownershipTypeRemove, rowData['dataSource']);
      this.callAPI();
    }
  }
  onRowEditSave = async (dataSource: IOwnershipType) => {
    this.defaultAddStatus();

    if (!this.branchesService.verificationService.stateVerification(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.closeTabService.ownershipType.shift();
        return;
      }
      this.closeTabService.ownershipType[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }

    if (dataSource['dataSource'].isNew) {
      this.onRowAdd(dataSource['dataSource'], dataSource['ri']);
    }
    else {
      const res = await this.branchesService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ownershipTypeEdit, dataSource['dataSource']);
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }
  private async onRowAdd(dataSource: IOwnershipType, rowIndex: number) {
    const res = await this.branchesService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ownershipTypeAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }

  newRow(): IOwnershipType {
    return { id: 0, title: '', isActive: false, isNew: true };
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  testChangedValue() { this.newRowLimit = 2; }
}