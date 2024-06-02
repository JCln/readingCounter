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
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.calculationByInterval, this.closeTabService.calculationRequestDraft);
    console.log(res);

  }
  dictionaryWrapper = async () => {
    this.offeringGroupDictionary = await this.branchesService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.offeringAllInGroup, this.branchesService.utilsService.getRequestDraftIds().requestDraft);
  }
  classWrapper(): void {
    this.dictionaryWrapper();
    console.log(this.closeTabService.requestDraftReq.offeringIds);
  }

}
