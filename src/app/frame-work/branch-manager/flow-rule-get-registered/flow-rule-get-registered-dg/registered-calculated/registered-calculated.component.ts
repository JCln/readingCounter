import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_Routes } from 'interfaces/routes.enum';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-registered-calculated',
  templateUrl: './registered-calculated.component.html',
  styleUrls: ['./registered-calculated.component.scss']
})
export class RegisteredCalculatedComponent extends FactoryONE {
  offeringGroupDictionary: any[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }
  callAPI = async () => {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.calculationInTime, this.closeTabService.calculationRequestDraft);
    this.closeTabService.requestDraftCalculationRes = res;
  }
  dictionaryWrapper = async () => {
    this.offeringGroupDictionary = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.offeringGroupGet);
  }
  classWrapper(): void {
    // if there is no data to request, route to first page which is edit step
    if (MathS.isNull(this.closeTabService.calculationRequestDraft.offeringGroupIds)) {
      this.branchesService.utilsService.routeTo(EN_Routes.flowRuleGetRegisteredStep);
      return;
    }
    console.log(this.closeTabService.requestDraftCalculationRes);
    console.log(this.closeTabService.calculationRequestDraft);
    this.dictionaryWrapper();

  }

}