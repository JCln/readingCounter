import { BranchesService } from 'services/branches.service';
import { Component } from '@angular/core';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { Converter } from 'src/app/classes/converter';

@Component({
  selector: 'app-excel-to-fill',
  templateUrl: './excel-to-fill.component.html',
  styleUrls: ['./excel-to-fill.component.scss']
})
export class ExcelToFillComponent extends FactoryONE {

  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  getTarrifTypeDictionary: any[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }

  getNesseseriesByZone = async () => {
    this.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
    this.karbariDictionary = await this.branchesService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.getTarrifTypeDictionary = this.branchesService.utilsService.getTarrifTypeDictionary();

    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.zoneDictionary, 'zoneId');
    Converter.convertIdToTitle(this.closeTabService.saveDataForSearchPro, this.karbariDictionary, 'karbariCode');
    Converter.convertIdToTitle(this.closeTabService.tarrifTypeItem, this.getTarrifTypeDictionary, 'tariffTypeId');
  }
  classWrapper = async () => {

    this.getNesseseriesByZone();
  }
  async connectToServer() {
  }


}
