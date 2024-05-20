import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-offering-group',
  templateUrl: './offering-group.component.html',
  styleUrls: ['./offering-group.component.scss']
})
export class OfferingGroupComponent extends FactoryONE {
  // private readonly _outputFileName: string = 'requestDraftOffering';
  _selectCols: any = [];
  offeringGroupDictionary: IDictionaryManager[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }
  dictionaryWrapper = async () => {
    console.log(this.branchesService.utilsService.getRequestDraftIds().requestDraft);

    this.offeringGroupDictionary = await this.branchesService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.offeringAllInGroup, this.branchesService.utilsService.getRequestDraftIds().requestDraft);
  }
  // insertSelectedColumns = () => {
  //   this._selectCols = this.branchesService.columnManager.getColumnsMenus(this._outputFileName);
  // }
  classWrapper = async () => {
    // this.insertSelectedColumns();
    this.dictionaryWrapper();
  }

}
