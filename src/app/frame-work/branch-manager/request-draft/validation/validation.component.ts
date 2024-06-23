import { Component } from '@angular/core';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent extends FactoryONE {
  private readonly _outputFileName: string = 'requestDraftValidation';
  ownershipTypeDictionary: IDictionaryManager[] = [];
  customerTypeDictionary: IDictionaryManager[] = [];
  _selectCols: any = [];
  submitted: boolean = false;

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }
  dictionaryWrapper = async () => {
    this.ownershipTypeDictionary = await this.branchesService.dictionaryWrapperService.getOwnershipTypeDictionary(false);
    this.customerTypeDictionary = await this.branchesService.dictionaryWrapperService.getCustomerTypeDictionary(false);
  }
  insertSelectedColumns = () => {
    this._selectCols = this.branchesService.columnManager.getColumnsMenus(this._outputFileName);
  }
  classWrapper = async () => {
    this.insertSelectedColumns();
    this.dictionaryWrapper();
  }
  nextPage() {
    if (this.branchesService.verificationService.requestDraftValidation(this.closeTabService.requestDraftReq)) {
      //   this.closeTabService.utilsService.routeToByUrl(EN_Routes.requestDraftOffering);
      // } else {
      //   this.submitted = true;
      // }
    }
  }

}
