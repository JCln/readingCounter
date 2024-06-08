import { Component } from '@angular/core';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent extends FactoryONE {
  private readonly _outputFileName: string = 'requestDraftLocation';
  zoneDictionary: IDictionaryManager[] = [];
  villageDictionary: IDictionaryManager[] = [];

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
    this.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
    this.villageDictionary = await this.branchesService.dictionaryWrapperService.getVillageDictionary();
    this.insertSelectedColumns();
  }
  async showInMap() {
    const res = await this.branchesService.openMapDialog([], true);
    this.closeTabService.requestDraftReq.x = res.x;
    this.closeTabService.requestDraftReq.y = res.y;
  }

}
