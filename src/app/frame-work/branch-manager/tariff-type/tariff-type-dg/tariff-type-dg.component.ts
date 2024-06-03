import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ITariffType } from 'interfaces/i-branch';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-tariff-type-dg',
  templateUrl: './tariff-type-dg.component.html',
  styleUrls: ['./tariff-type-dg.component.scss']
})
export class TariffTypeDgComponent implements OnInit {
  tariffTypeReq: ITariffType = {
    id: 0,
    title: '',
    isPositive: false,
    isEditing: false
  }
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
  async onRowAdd(dataSource: ITariffType) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.tariffTypeAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: ITariffType) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.tariffTypeEdit, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.branchesService.verificationService.tariffType(this.tariffTypeReq))
      MathS.isNull(this.config.data) ? this.onRowAdd(this.tariffTypeReq) : this.onRowEdit(this.tariffTypeReq)
  }
  ngOnInit(): void {
    if (this.config.data) {
      this.tariffTypeReq = this.config.data;
      // isEditing = true; should be last line
      this.tariffTypeReq.isEditing = true;
    }
  }
}