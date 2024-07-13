import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
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
  items: any = [];
  extrasReq: any;

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }
  callAPI = async () => {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.calculationInTime, this.closeTabService.calculationRequestDraft);
    console.log(res);
  }
  dictionaryWrapper = async () => {
    this.offeringDictionary = await this.branchesService.dictionaryWrapperService.getOffering(false);
  }
  classWrapper(): void {
    // if there is no data to request, route to first page which is edit step    
    this.dictionaryWrapper();
  }
  addNewItem() {
    this.items.push({ fromRate: null, toRate: this.offeringDictionary });
  }
  deleteRate(index: number) {
    this.items.splice(index, 1);
  }

}
