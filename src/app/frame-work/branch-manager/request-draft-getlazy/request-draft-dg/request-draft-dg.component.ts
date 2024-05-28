import { CloseTabService } from 'services/close-tab.service';
import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IRequestDraft } from 'interfaces/i-branch';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';

@Component({
  selector: 'app-request-draft-dg',
  templateUrl: './request-draft-dg.component.html',
  styleUrls: ['./request-draft-dg.component.scss']
})
export class RequestDraftDgComponent implements OnInit {
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
  private readonly requestDraftLazyEditColumns: string = 'requestDraftLazyEditColumns';

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public branchesService: BranchesService,
    public closeTabService: CloseTabService
  ) {
  }
  callAPI = async () => {
    if (this.branchesService.verificationService.requestDraftAdd(this.dataSource)) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.requestDraftEdit, this.dataSource);
      if (res) {
        this.branchesService.utilsService.snackBarMessageSuccess(res.message);
        this.editCloseData();
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
    this.dataSource = this.config.data;
    this.dictionaryWrapper();
    console.log(this.dataSource);

    this._selectedDatas = this.branchesService.columnManager.getColumnsMenus(this.requestDraftLazyEditColumns);
    console.log(this._selectedDatas);
    // this.cdr.detectChanges();
  }
  async showInMap() {
    const res = await this.branchesService.openMapDialog(this.dataSource, true);
    this.dataSource.x = res.x;
    this.dataSource.y = res.y;
  }
  ngOnInit(): void {
    this.counterWrapper();
  }
  editCloseData = () => {
    this.ref.close(true);
  }

}
