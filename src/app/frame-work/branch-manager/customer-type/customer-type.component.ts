import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ICustomerType } from 'interfaces/i-branch';
import { BranchesVerificationService } from 'services/branches-verification.service';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-customer-type',
  templateUrl: './customer-type.component.html',
  styleUrls: ['./customer-type.component.scss']
})
export class CustomerTypeComponent extends FactoryONE {
  clonedProducts: { [s: string]: ICustomerType; } = {};
  readonly customerTypeColumns: string = 'customerType';
  newRowLimit: number = 1;

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    public branchesVerificationService: BranchesVerificationService
  ) {
    super();
  }
  callAPI = async () => {
    this.closeTabService.customerType = await this.branchesService.dictionaryWrapperService.getCustomerTypeDictionary(true);
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.customerType)) {
      this.callAPI();
    }
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  removeRow = async (rowData: object) => {
    const a = await this.branchesService.firstConfirmDialog('عنوان: ' + rowData['dataSource'].title);
    if (a) {
      await this.branchesService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.customerTypeRemove, rowData['dataSource']);
      this.callAPI();
    }
  }
  onRowEditSave = async (dataSource: ICustomerType) => {
    this.defaultAddStatus();

    if (!this.branchesVerificationService.stateVerification(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.closeTabService.customerType.shift();
        return;
      }
      this.closeTabService.customerType[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }

    if (dataSource['dataSource'].isNew) {
      this.onRowAdd(dataSource['dataSource'], dataSource['ri']);
    }
    else {
      const res = await this.branchesService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.customerTypeEdit, dataSource['dataSource']);
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }
  private async onRowAdd(dataSource: ICustomerType, rowIndex: number) {
    const res = await this.branchesService.utilsService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.customerTypeAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }

  newRow(): ICustomerType {
    return { id: 0, title: '', isActive: false, isNew: true };
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  testChangedValue() { this.newRowLimit = 2; }
}