import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-request-draft-full-view',
  templateUrl: './request-draft-full-view.component.html',
  styleUrls: ['./request-draft-full-view.component.scss']
})
export class RequestDraftFullViewComponent extends FactoryONE {
  private readonly _outputFileName: string = 'requestDraftFullView';
  private readonly _outputFileNameAccordion: string = '';
  _selectCols: any = [];
  _selectColsAccordion: any = [];

  offeringGroupDictionary: IDictionaryManager[] = [];
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
    this.offeringGroupDictionary = await this.branchesService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.offeringAllInGroup, this.branchesService.utilsService.getRequestDraftIds().requestDraft);
  }
  callAPI = async () => {
    if (this.branchesService.verificationService.requestDraftAdd(this.closeTabService.requestDraftReq)) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestDraftAdd, this.closeTabService.requestDraftReq);
      const config = {
        messageTitle: res.message,
        minWidth: '21rem',
        isInput: false,
        isImportant: false,
        icon: 'pi pi-check',
        closable: true,
      }
      this.branchesService.utilsService.primeConfirmDialog(config);
    }
  }
  classWrapper = async () => {
    this.dictionaryWrapper();
    this.insertSelectedColumns();
  }
  async showInMap() {
    const res = await this.branchesService.openMapDialog([], true);
    this.closeTabService.requestDraftReq.x = res.x;
    this.closeTabService.requestDraftReq.y = res.y;
  }
}