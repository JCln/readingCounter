import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IAmountModifications } from 'interfaces/i-branch';
import { EN_Routes } from 'interfaces/routes.enum';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-registered-extras',
  templateUrl: './registered-extras.component.html',
  styleUrls: ['./registered-extras.component.scss']
})
export class RegisteredExtrasComponent extends FactoryONE {
  offeringDictionary: any[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }
  // verification(): boolean {
  //   for (let index = 0; index < this.closeTabService.flowRuleRegister.amountModifications.length; index++) {
  //     if (MathS.isNullTextValidation(this.closeTabService.flowRuleRegister.amountModifications[index].offeringId)) {
  //       this.closeTabService.utilsService.snackBarMessageWarn(`نرخ شماره ${index + 1}:` + EN_messages.insert_offeringId);
  //       return false;
  //     }
  //     if (MathS.isNullTextValidation(this.closeTabService.flowRuleRegister.amountModifications[index].amount)) {
  //       this.closeTabService.utilsService.snackBarMessageWarn(`نرخ شماره ${index + 1}:` + EN_messages.insert_toRate);
  //       return false;
  //     }
  //     if (MathS.isNaN(Number(this.closeTabService.flowRuleRegister.amountModifications[index].offeringId))) {
  //       this.closeTabService.utilsService.snackBarMessageWarn(`نرخ شماره ${index + 1}:` + EN_messages.wrong_offeringId);
  //       return false;
  //     }
  //     if (MathS.isNaN(Number(this.closeTabService.flowRuleRegister.amountModifications[index].amount))) {
  //       this.closeTabService.utilsService.snackBarMessageWarn(`نرخ شماره ${index + 1}:` + EN_messages.wrong_toRate);
  //       return false;
  //     }
  //     if (!MathS.isFromLowerThanTo(Number(this.closeTabService.flowRuleRegister.amountModifications[index].offeringId), Number(this.closeTabService.flowRuleRegister.amountModifications[index].amount))) {
  //       this.closeTabService.utilsService.snackBarMessageWarn(`نرخ شماره ${index + 1}:` + EN_messages.lessThan_rate);
  //       return false;
  //     }
  //     this.closeTabService.flowRuleRegister.amountModifications[index].offeringId = Number(this.closeTabService.flowRuleRegister.amountModifications[index].offeringId.trim());
  //     this.closeTabService.flowRuleRegister.amountModifications[index].amount = Number(this.closeTabService.flowRuleRegister.amountModifications[index].amount.trim());
  //   }
  //   return true;
  // }
  // to do verification and post sth to extras datas
  callAPI = async () => {
    console.log(this.closeTabService.flowRuleRegister);
    if (this.branchesService.verificationService.registeredExtras(this.closeTabService.flowRuleRegister)) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.calculationAddModification, this.closeTabService.flowRuleRegister);
      console.log(res);
      this.branchesService.utilsService.routeTo(EN_Routes.flowRuleGetRegisteredStepInstallment);
    }
  }
  dictionaryWrapper = async () => {
    this.offeringDictionary = await this.branchesService.dictionaryWrapperService.getOffering(false);
  }
  classWrapper(): void {
    // if there is no data to request, route to first page which is edit step    
    if (this.branchesService.verificationService.registeredExtras(this.closeTabService.flowRuleRegister)) {
      this.dictionaryWrapper();
    }
    else {
      this.branchesService.utilsService.routeTo(EN_Routes.flowRuleGetRegisteredStep);
    }
  }
  addNewItem() {
    this.closeTabService.flowRuleRegister.amountModifications.push({ offeringId: null, amount: null });
  }
  deleteRate(index: number) {
    this.closeTabService.flowRuleRegister.amountModifications.splice(index, 1);
  }

}
