import { BranchesService } from 'services/branches.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IClientAll } from 'interfaces/i-branch';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';

@Component({
  selector: 'app-client-lazy-edit',
  templateUrl: './client-lazy-edit.component.html',
  styleUrls: ['./client-lazy-edit.component.scss']
})
export class ClientLazyEditComponent implements OnInit {
  dataSource: IClientAll;
  dics = {
    zoneDictionary: [],
    usageDictionary: [],
    branchDiameterDictionary: [],
    guildDictionary: [],
    ownershipTypeDictionary: [],
    branchStateDictionary: [],
    waterSourceDictionary: [],
    customerTypeDictionary: [],
  }
  _selectedDatas: IObjectIteratation[];
  private readonly clientGetLazyEditColumns: string = 'clientGetLazyEditColumns';

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public branchesService: BranchesService,
    private cdr: ChangeDetectorRef
  ) {
  }
  callAPI = async () => {
    if (this.branchesService.verificationService.clientAdd(this.dataSource)) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.clientEdit, this.dataSource);
      if (res) {
        this.branchesService.utilsService.snackBarMessageSuccess(res.message);
        this.editCloseData();
      }
    }
  }
  dictionaryWrapper = async () => {
    this.dics.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
    this.dics.usageDictionary = await this.branchesService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.dics.branchDiameterDictionary = await this.branchesService.dictionaryWrapperService.getQotrDictionary();
    this.dics.guildDictionary = await this.branchesService.dictionaryWrapperService.getGuildDictionary(false);
    this.dics.ownershipTypeDictionary = await this.branchesService.dictionaryWrapperService.getOwnershipTypeDictionary(false);
    this.dics.branchStateDictionary = await this.branchesService.dictionaryWrapperService.getBranchStateDictionary(false);
    this.dics.waterSourceDictionary = await this.branchesService.dictionaryWrapperService.getWaterSourceDictionary(false);
    this.dics.customerTypeDictionary = await this.branchesService.dictionaryWrapperService.getCustomerTypeDictionary(false);
  }
  counterWrapper = async () => {
    this.dictionaryWrapper();
    this.dataSource = this.config.data;
    console.log(this.dataSource);

    this._selectedDatas = this.branchesService.columnManager.getColumnsMenus(this.clientGetLazyEditColumns);
    this.cdr.detectChanges();
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
  receiveFromDateInstallation = ($event: string) => {//just watarInstallationJalaliDay date
    this.dataSource.watarInstallationJalaliDay = $event;
  }
  receiveToDateInstallation = ($event: string) => {//just sewageInstallationJalaliDay date
    this.dataSource.sewageInstallationJalaliDay = $event;
  }


}
