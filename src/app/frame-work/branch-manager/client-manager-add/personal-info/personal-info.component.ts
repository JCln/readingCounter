import { Component } from '@angular/core';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent extends FactoryONE {
  private readonly _outputFileName: string = 'clientAddPersonalInfo';
  _selectCols: any = [];

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

}
