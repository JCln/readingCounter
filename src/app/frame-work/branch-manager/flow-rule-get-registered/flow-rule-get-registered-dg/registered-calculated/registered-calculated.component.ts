import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-registered-calculated',
  templateUrl: './registered-calculated.component.html',
  styleUrls: ['./registered-calculated.component.scss']
})
export class RegisteredCalculatedComponent extends FactoryONE {
  offeringGroupDictionary: any[] = [];
  offeringDictionary: any[] = [];
  latestSum: number = null;

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }
  callAPI = async () => {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.calculationInTime, this.closeTabService.flowRuleRegister);
    res.forEach(item => {
      item.isEditable = false;
      this.latestSum += item.value;
    })
    this.closeTabService.requestDraftCalculationRes = res;
  }
  dictionaryWrapper = async () => {
    this.offeringGroupDictionary = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.offeringGroupGet);
    this.offeringDictionary = await this.branchesService.dictionaryWrapperService.getOffering(false);
  }
  addNewItem(item: any) {
    let titleValue: string = '';
    this.offeringDictionary.forEach(offer => {
      if (item.offeringId == offer.id) {
        titleValue = offer.title;
        return;
      }
    })
    if (this.branchesService.verificationService.registerCalculated(item)) {
      this.closeTabService.requestDraftCalculationRes.push(
        {
          offeringTitle: titleValue,
          value: Number(item.amount),
          typeTitle: '',
          isEditable: true
        })
    }
  }
  firstViewItemToAdd() {
    if (this.closeTabService.flowRuleRegister.amountModifications.length == 0)
      this.closeTabService.flowRuleRegister.amountModifications.push({ offeringId: this.offeringDictionary[0], amount: null });
  }
  removeItem(index: number) {
    this.closeTabService.requestDraftCalculationRes.splice(index, 1);
  }
  classWrapper(): void {
    // if there is no data to request, route to first page which is edit step
    this.callAPI();
    this.dictionaryWrapper();
    this.firstViewItemToAdd();
  }


}
