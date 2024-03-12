import { Component } from '@angular/core';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-client-manager-add',
  templateUrl: './client-manager-add.component.html',
  styleUrls: ['./client-manager-add.component.scss']
})
export class ClientManagerAddComponent extends FactoryONE {
  private readonly _outputFileName: string = 'clientManagerAdd';
  private readonly _outputFileNameAccordion: string = '';
  _selectCols: any = [];
  _selectColsAccordion: any = [];

  qotrDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  usageDictionary: IDictionaryManager[] = [];
  branchDiameterDictionary: IDictionaryManager[] = [];
  guildDictionary: IDictionaryManager[] = [];
  ownershipTypeDictionary: IDictionaryManager[] = [];
  branchStateDictionary: IDictionaryManager[] = [];
  waterSourceDictionary: IDictionaryManager[] = [];
  customerTypeDictionary: IDictionaryManager[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService
  ) {
    super();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.branchesService.columnManager.getColumnsMenus(this._outputFileName);
    this._selectColsAccordion = this.branchesService.columnManager.getColumnsMenus(this._outputFileNameAccordion);
  }
  dictionaryWrapper = async () => {
    this.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
    this.usageDictionary = await this.branchesService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.branchDiameterDictionary = await this.branchesService.dictionaryWrapperService.getQotrDictionary();
    this.guildDictionary = await this.branchesService.dictionaryWrapperService.getGuildDictionary(false);
    this.ownershipTypeDictionary = await this.branchesService.dictionaryWrapperService.getOwnershipTypeDictionary(false);
    this.branchStateDictionary = await this.branchesService.dictionaryWrapperService.getBranchStateDictionary(false);
    this.waterSourceDictionary = await this.branchesService.dictionaryWrapperService.getWaterSourceDictionary(false);
    this.customerTypeDictionary = await this.branchesService.dictionaryWrapperService.getCustomerTypeDictionary(false);
  }
  callAPI = async () => {
    console.log(this.closeTabService.clientAddReq);

  }
  classWrapper = async () => {
    this.dictionaryWrapper();
    this.insertSelectedColumns();
    this.insertSelectedColumns();
    console.log(this._selectCols);

  }
}