import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent extends FactoryONE {
  offeringGroupDictionary: any[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }
  callAPI = async () => {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.calculationInTime, this.closeTabService.flowRuleRegister);
    this.closeTabService.requestDraftCalculationRes = res;
  }
  dictionaryWrapper = async () => {
    this.offeringGroupDictionary = await this.branchesService.dictionaryWrapperService.getOfferingGroup(false);
  }
  classWrapper(): void {
    this.dictionaryWrapper();
    console.log(this.closeTabService.flowRuleRegister);

  }

}
