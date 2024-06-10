import { Component } from '@angular/core';
import { EN_Routes } from 'interfaces/routes.enum';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-other-info',
  templateUrl: './other-info.component.html',
  styleUrls: ['./other-info.component.scss']
})
export class OtherInfoComponent extends FactoryONE {
  private readonly _outputFileName: string = 'requestDraftOtherInfo';
  _selectCols: any = [];
  submitted: boolean = false;

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }

  insertSelectedColumns = () => {
    this._selectCols = this.branchesService.columnManager.getColumnsMenus(this._outputFileName);
  }
  classWrapper = async () => {
    this.insertSelectedColumns();
  }
  nextPage() {
    if (this.branchesService.verificationService.requestDraftOther(this.closeTabService.requestDraftReq)) {
      this.closeTabService.utilsService.routeToByUrl(EN_Routes.requestDraftLocation);
    } else {
      this.submitted = true;
    }
  }

}