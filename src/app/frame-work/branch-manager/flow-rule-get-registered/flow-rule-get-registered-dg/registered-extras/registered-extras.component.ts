import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IAmountModifications } from 'interfaces/i-branch';
import { EN_Routes } from 'interfaces/routes.enum';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';

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
  callAPI = async () => {
    // to do verification and post sth to extras datas
    console.log(this.closeTabService.calculationModification);
    if (this.branchesService.verificationService.registeredExtras(this.closeTabService.calculationModification)) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.calculationAddModification, this.closeTabService.calculationModification);
      console.log(res);
      this.branchesService.utilsService.routeTo(EN_Routes.flowRuleGetRegisteredStepInstallment);
    }
  }
  dictionaryWrapper = async () => {
    this.offeringDictionary = await this.branchesService.dictionaryWrapperService.getOffering(false);
  }
  classWrapper(): void {
    // if there is no data to request, route to first page which is edit step    
    if (this.branchesService.verificationService.registeredExtras(this.closeTabService.calculationModification)) {
      this.dictionaryWrapper();
    }
    else {
      this.branchesService.utilsService.routeTo(EN_Routes.flowRuleGetRegisteredStep);
    }
  }
  addNewItem() {
    this.closeTabService.calculationModification.amountModifications.push({ offeringId: null, amount: null });
  }
  deleteRate(index: number) {
    this.closeTabService.calculationModification.amountModifications.splice(index, 1);
  }

}
