import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ICounterNumberChangeAll } from 'interfaces/i-branch';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';

@Component({
  selector: 'app-counter-number-change-dg',
  templateUrl: './counter-number-change-dg.component.html',
  styleUrls: ['./counter-number-change-dg.component.scss']
})
export class CounterNumberChangeDgComponent implements OnInit {
  dataSource: ICounterNumberChangeAll;
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
  private readonly counterNumberChangeColumns: string = 'counterNumberChangeColumns';

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public branchesService: BranchesService,
    private cdr: ChangeDetectorRef
  ) {
  }
  callAPI = async () => {
    if (this.branchesService.verificationService.clientAdd(this.dataSource)) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.counterNumberChangeEdit, this.dataSource);
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

    this._selectedDatas = this.branchesService.columnManager.getColumnsMenus(this.counterNumberChangeColumns);
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
