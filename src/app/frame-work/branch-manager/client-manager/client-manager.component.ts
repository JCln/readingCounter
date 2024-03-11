import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-client-manager',
  templateUrl: './client-manager.component.html',
  styleUrls: ['./client-manager.component.scss']
})
export class ClientManagerComponent extends FactoryONE {
  private readonly _outputFileName: string = 'clientManager';
  private readonly _outputFileNameAccordion: string = '';
  _selectCols: any = [];
  _selectColsAccordion: any = [];

  karbariDictionaryCode: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.branchesService.columnManager.getColumnsMenus(this._outputFileName);
    this._selectColsAccordion = this.branchesService.columnManager.getColumnsMenus(this._outputFileNameAccordion);
    console.log(this._selectCols);
  }
  dictionaryWrapper = async () => {
    this.karbariDictionaryCode = await this.branchesService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.qotrDictionary = await this.branchesService.dictionaryWrapperService.getQotrDictionary();

    Converter.convertIdToTitle([this.closeTabService.clientGet], this.karbariDictionaryCode, 'karbariCode');
    Converter.convertIdToTitle([this.closeTabService.clientGet], this.karbariDictionaryCode, 'possibleKarbariCode');
    Converter.convertIdToTitle([this.closeTabService.clientGet], this.qotrDictionary, 'qotrCode');
  }
  callAPI = async () => {
    this.closeTabService.clientGet = await this.branchesService.utilsService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.clientGet, this.branchesService.pageSignsService.clientManager_pageSign.id);
    this.dictionaryWrapper();
    this.insertSelectedColumns();

  }
  classWrapper = async () => {
    this.insertSelectedColumns();
    console.log(this._selectCols);

  }
}
