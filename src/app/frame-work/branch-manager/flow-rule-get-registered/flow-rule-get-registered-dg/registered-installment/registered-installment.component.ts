import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENRandomNumbers } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-registered-installment',
  templateUrl: './registered-installment.component.html',
  styleUrls: ['./registered-installment.component.scss']
})
export class RegisteredInstallmentComponent extends FactoryONE {
  private readonly _outputFileNamePostal: string = 'flowRuleInstallment';
  private readonly _outputFileNameBillId: string = 'flowRuleInstallmentTwo';
  ownershipTypeDictionary: IDictionaryManager[] = [];
  customerTypeDictionary: IDictionaryManager[] = [];
  paymentMethod: any[] = [];
  _selectedPaymentMethod: any;
  _selectColsPostal: any = [];
  _selectColsBillId: any = [];
  submitted: boolean = false;

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }
  dictionaryWrapper = async () => {
    this.paymentMethod = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.scheduledPaymentMethodAll);
    this.ownershipTypeDictionary = await this.branchesService.dictionaryWrapperService.getOwnershipTypeDictionary(false);
    this.customerTypeDictionary = await this.branchesService.dictionaryWrapperService.getCustomerTypeDictionary(false);
  }
  insertSelectedColumns = () => {
    if (this._selectedPaymentMethod.isInstallment) {
      this._selectColsBillId = this.branchesService.columnManager.getColumnsMenus(this._outputFileNameBillId);
      this._selectColsPostal = this.branchesService.columnManager.getColumnsMenus(this._outputFileNamePostal);
    }
  }
  classWrapper = async () => {
    this.dictionaryWrapper();
    this.insertSelectedColumns();
  }
  async nextPage() {
    console.log(this._selectedPaymentMethod.isInstallment);
    // if isInstallment is true then do installment process
    if (this._selectedPaymentMethod.isInstallment) {
      if (this.branchesService.verificationService.flowRuleInstallment(this.closeTabService.calculationAddInstallment)) {
        // call api to complete available datas
        const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.calculationInstallment, this.closeTabService.calculationAddInstallment);
        console.log(res);

        this.closeTabService.utilsService.routeToByUrl(EN_Routes.flowRuleGetRegisteredStepReCalc);
      } else {
        this.submitted = true;
      }
    }
    else {
      this.closeTabService.calculationAddInstallment.schedulePaymentInput.inAdvancedPaymentPercentage = ENRandomNumbers.oneHundred;
      this.closeTabService.calculationAddInstallment.schedulePaymentInput.installmentNumber = ENRandomNumbers.one;
      if (this.branchesService.verificationService.flowRuleInstallment(this.closeTabService.calculationAddInstallment)) {
        const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.calculationInstallment, this.closeTabService.calculationAddInstallment);
        console.log(res);
        this.closeTabService.utilsService.routeToByUrl(EN_Routes.flowRuleGetRegisteredStepReCalc);
      } else {
        this.submitted = true;
      }
    }
  }
  itemsChanged() {
    // TODO: triggered proper items on click payment method    
    this.insertSelectedColumns();
  }

}
