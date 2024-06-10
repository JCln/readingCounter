import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-offering-group',
  templateUrl: './offering-group.component.html',
  styleUrls: ['./offering-group.component.scss']
})
export class OfferingGroupComponent extends FactoryONE {
  private readonly _outputFileName: string = 'requestDraftOfferingGroup';
  _selectCols: any = [];
  offeringGroupDictionary: any[] = [];
  submitted: boolean = false;

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }
  dictionaryWrapper = async () => {
    this.offeringGroupDictionary = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.offeringGroupGet);
  }
  insertSelectedColumns = () => {
    this._selectCols = this.branchesService.columnManager.getColumnsMenus(this._outputFileName);
  }
  classWrapper = async () => {
    this.insertSelectedColumns();
    this.dictionaryWrapper();
  }
  nextPage() {
    if (this.branchesService.verificationService.requestDraftOffering(this.closeTabService.requestDraftReq)) {
      this.closeTabService.utilsService.routeToByUrl(EN_Routes.requestDraftPersonal);
    } else {
      this.submitted = true;
    }
  }

}
