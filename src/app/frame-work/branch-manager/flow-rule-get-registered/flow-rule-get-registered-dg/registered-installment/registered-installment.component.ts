import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENRandomNumbers } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-registered-installment',
  templateUrl: './registered-installment.component.html',
  styleUrls: ['./registered-installment.component.scss']
})
export class RegisteredInstallmentComponent extends FactoryONE {
  private readonly _outputFileName: string = 'flowRuleInstallment';
  ownershipTypeDictionary: IDictionaryManager[] = [];
  customerTypeDictionary: IDictionaryManager[] = [];
  paymentMethod: any[] = [];
  // default value of _selectedPaymentMethod is here
  _selectedPaymentMethod = {
    id: 2,
    title: 'نقد',
    isInstallment: false,
    isActive: true
  };
  _selectColsPostal: any[] = [];
  submitted: boolean = false;

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }
  dictionaryWrapper = async () => {
    this.paymentMethod = await this.branchesService.dictionaryWrapperService.getScheduledPaymentMethodDictionary(false);
    this.ownershipTypeDictionary = await this.branchesService.dictionaryWrapperService.getOwnershipTypeDictionary(false);
    this.customerTypeDictionary = await this.branchesService.dictionaryWrapperService.getCustomerTypeDictionary(false);
  }
  insertSelectedColumns = () => {
    console.log(this._selectedPaymentMethod.isInstallment);

    if (this._selectedPaymentMethod.isInstallment) {
      this._selectColsPostal = this.branchesService.columnManager.getColumnsMenus(this._outputFileName);
    } else {
      this._selectColsPostal = [];
    }
  }
  classWrapper = async () => {
    this.dictionaryWrapper();
    this.insertSelectedColumns();
  }
  async nextPage() {
    console.log(this._selectedPaymentMethod.isInstallment);
    // if isInstallment is true then do installment process
    if (MathS.isNull(this._selectedPaymentMethod.isInstallment)) {
      this.closeTabService.flowRuleRegister.schedulePaymentInput.inAdvancedPaymentPercentage = ENRandomNumbers.oneHundred;
      this.closeTabService.flowRuleRegister.schedulePaymentInput.installmentNumber = ENRandomNumbers.one;
    }
    if (this.branchesService.verificationService.flowRuleInstallment(this.closeTabService.flowRuleRegister)) {
      // call api to complete available datas
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.calculationInstallment, this.closeTabService.flowRuleRegister);
      console.log(res);

      this.closeTabService.utilsService.routeToByUrl(EN_Routes.flowRuleGetRegisteredStepReCalc);
    } else {
      this.submitted = true;
    }
  }
  itemsChanged() {
    // TODO: triggered proper items on click payment method    
    this.insertSelectedColumns();
  }

}
