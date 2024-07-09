import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-registered-edit',
  templateUrl: './registered-edit.component.html',
  styleUrls: ['./registered-edit.component.scss']
})
export class RegisteredEditComponent implements OnInit {
  zoneDictionary: [];
  siphonDictionary: any[] = [];
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
    if (this.branchesService.verificationService.requestDraftAdd(this.closeTabService.flowRuleRegisteredEdit)) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestDraftEdit, this.closeTabService.flowRuleRegisteredEdit);
      if (res) {
        this.closeTabService.calculationRequestDraft.requestDraftId = res.targetObject.id;
        this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      }
    }
  }
  dictionaryWrapper = async () => {
    this.offeringGroupDictionary = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.offeringGroupGet);
    this.siphonDictionary = await this.branchesService.dictionaryWrapperService.getSiphonDictionary(false);
    this.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
    this.usageDictionary = await this.branchesService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.branchDiameterDictionary = await this.branchesService.dictionaryWrapperService.getQotrDictionary();
    this.guildDictionary = await this.branchesService.dictionaryWrapperService.getGuildDictionary(false);
    this.ownershipTypeDictionary = await this.branchesService.dictionaryWrapperService.getOwnershipTypeDictionary(false);
    this.branchStateDictionary = await this.branchesService.dictionaryWrapperService.getBranchStateDictionary(false);
    this.waterSourceDictionary = await this.branchesService.dictionaryWrapperService.getWaterSourceDictionary(false);
    this.customerTypeDictionary = await this.branchesService.dictionaryWrapperService.getCustomerTypeDictionary(false);
  }
  classWrapper = async () => {
    this.dictionaryWrapper();
    this._selectedDatas = this.branchesService.columnManager.getColumnsMenus(this._outputFileName);
  }
  async showInMap() {
    const res = await this.branchesService.openMapDialog(this.closeTabService.flowRuleRegisteredEdit, true);
    this.closeTabService.flowRuleRegisteredEdit.x = res.x;
    this.closeTabService.flowRuleRegisteredEdit.y = res.y;
  }
  ngOnInit(): void {
    if (MathS.isNull(this.closeTabService.flowRuleRegisteredEdit)) {
      // backto previous page if there is no object(data)
      this.branchesService.utilsService.routeTo(EN_Routes.flowRuleGetRegisteredLazy);
      return;
    }
    this.classWrapper();
  }

}
