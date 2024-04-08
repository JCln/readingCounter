import { BranchesService } from 'services/branches.service';
import { Component, OnInit } from '@angular/core';
import { ITarrifTypeItem } from 'interfaces/i-branch';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ColumnManager } from 'src/app/classes/column-manager';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-tarriftype-add-dg',
  templateUrl: './tarriftype-add-dg.component.html',
  styleUrls: ['./tarriftype-add-dg.component.scss']
})
export class TarriftypeAddDgComponent implements OnInit {
  tarrifTypeReq: ITarrifTypeItem = {
    id: 0,
    tariffTypeId: 0,
    tariffCalculationMode: 0,
    dynamicTariffCalculationMode: 0,
    dynamicTariffTypeId: 0,
    title: '',
    description: '',
    isActive: true,
    isEditing: false,
  }
  getTarrifCalculationModeDictionary: any[] = [];
  getTarrifTypeDictionary: any[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public columnManager: ColumnManager,
    private branchesService: BranchesService
  ) { }

  close() {
    this.ref.close();
  }
  closeSuccess() {
    this.ref.close(true);
  }
  async onRowAdd(dataSource: ITarrifTypeItem) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.tarriffTypeItemManagerAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: ITarrifTypeItem) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.tarriffTypeItemManagerEdit, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.branchesService.verificationService.tarrifTypeItem(this.tarrifTypeReq))
      MathS.isNull(this.config.data) ? this.onRowAdd(this.tarrifTypeReq) : this.onRowEdit(this.tarrifTypeReq)
  }
  ngOnInit(): void {
    this.getTarrifCalculationModeDictionary = this.branchesService.utilsService.getTarrifCalculationModeDictionary();
    this.getTarrifTypeDictionary = this.branchesService.utilsService.getTarrifTypeDictionary();
    if (this.config.data) {
      this.tarrifTypeReq = this.config.data;

      // isEditing = true; should be last line
      this.tarrifTypeReq.isEditing = true;
    }
  }
}