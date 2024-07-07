import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IRequestDraft } from 'interfaces/i-branch';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';

@Component({
  selector: 'app-registered-edit',
  templateUrl: './registered-edit.component.html',
  styleUrls: ['./registered-edit.component.scss']
})
export class RegisteredEditComponent implements OnInit {
  dataSource: IRequestDraft;
  zoneDictionary: [];
  usageDictionary: [];
  branchDiameterDictionary: [];
  guildDictionary: [];
  ownershipTypeDictionary: [];
  branchStateDictionary: [];
  waterSourceDictionary: [];
  customerTypeDictionary: [];
  offeringGroupDictionary: any[] = [];
  _selectedDatas: IObjectIteratation[] = [];
  private readonly _outputFileName: string = 'flowRuleGetRegisteredStepperEditColumns';

  constructor(
    public branchesService: BranchesService,
    public closeTabService: CloseTabService
  ) {
  }
  callAPI = async () => {
    if (this.branchesService.verificationService.requestDraftAdd(this.dataSource)) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestDraftEdit, this.dataSource);
      if (res) {
        this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      }
    }
  }
  dictionaryWrapper = async () => {
    this.offeringGroupDictionary = await this.branchesService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.offeringAllInGroup, this.branchesService.utilsService.getRequestDraftIds().requestDraft);
    this.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
    this.usageDictionary = await this.branchesService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.branchDiameterDictionary = await this.branchesService.dictionaryWrapperService.getQotrDictionary();
    this.guildDictionary = await this.branchesService.dictionaryWrapperService.getGuildDictionary(false);
    this.ownershipTypeDictionary = await this.branchesService.dictionaryWrapperService.getOwnershipTypeDictionary(false);
    this.branchStateDictionary = await this.branchesService.dictionaryWrapperService.getBranchStateDictionary(false);
    this.waterSourceDictionary = await this.branchesService.dictionaryWrapperService.getWaterSourceDictionary(false);
    this.customerTypeDictionary = await this.branchesService.dictionaryWrapperService.getCustomerTypeDictionary(false);
  }
  counterWrapper = async () => {
    this.dictionaryWrapper();
    this._selectedDatas = this.branchesService.columnManager.getColumnsMenus(this._outputFileName);    
  }
  async showInMap() {
    const res = await this.branchesService.openMapDialog(this.dataSource, true);
    this.dataSource.x = res.x;
    this.dataSource.y = res.y;
  }
  ngOnInit(): void {
    this.counterWrapper();
  }

}
