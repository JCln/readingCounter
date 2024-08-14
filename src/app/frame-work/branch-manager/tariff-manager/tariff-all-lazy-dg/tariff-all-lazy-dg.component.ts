import { CloseTabService } from 'services/close-tab.service';
import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ITariffAll } from 'interfaces/i-branch';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-tariff-all-lazy-dg',
  templateUrl: './tariff-all-lazy-dg.component.html',
  styleUrls: ['./tariff-all-lazy-dg.component.scss']
})
export class TariffAllLazyDgComponent implements OnInit {
  tarrifReq: ITariffAll = {
    id: 0,
    zoneId: 0,
    zoneTitle: '',
    formula: '',
    usageId: 0,
    fromDate: this.closeTabService.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.closeTabService.utilsService.dateJalaliService.getCurrentDate(),
    fromRate: 0,
    toRate: 0,
    offeringId: 0,
    calulcationOrder: 0,
    tarrifTypeItemId: 0,
    usageTitle: '',
    offeringTitle: '',
    tarrifTypeItemTitle: '',
    isEditing: false,
  }
  offeringDictionary: any[] = [];
  zoneDictionary: any[] = [];
  usageDictionary: any[] = [];
  getTarrifTypeDictionary: any[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public columnManager: ColumnManager,
    private branchesService: BranchesService,
    public closeTabService: CloseTabService
  ) { }

  close() {
    this.ref.close();
  }
  closeSuccess() {
    this.ref.close(true);
  }
  async onRowAdd(dataSource: ITariffAll) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.tariffAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: ITariffAll) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.tariffEdit, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.branchesService.verificationService.tarrifManager(this.tarrifReq))
      MathS.isNull(this.config.data.data) ? this.onRowAdd(this.tarrifReq) : this.onRowEdit(this.tarrifReq)
  }
  classWrapper = async () => {
    this.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
    this.usageDictionary = await this.branchesService.dictionaryWrapperService.getkarbariCodeDictionary();
    this.offeringDictionary = await this.branchesService.dictionaryWrapperService.getOffering(false);
    this.getTarrifTypeDictionary = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.tarriffTypeItemManagerGet);
    console.log(this.config.data);

    if (this.config.data.isEditing) {

      this.tarrifReq = this.config.data.data;

      // isEditing = true; should be last line
      this.tarrifReq.isEditing = true;
    }
    console.log(this.tarrifReq);

  }
  ngOnInit(): void {
    this.classWrapper();
  }
}