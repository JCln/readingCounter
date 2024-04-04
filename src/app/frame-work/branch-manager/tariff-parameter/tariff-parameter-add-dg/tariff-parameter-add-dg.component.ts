import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ITarrifParameter } from 'interfaces/i-branch';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-tariff-parameter-add-dg',
  templateUrl: './tariff-parameter-add-dg.component.html',
  styleUrls: ['./tariff-parameter-add-dg.component.scss']
})
export class TariffParameterAddDgComponent implements OnInit {
  tariffParameterReq: ITarrifParameter = {
    id: 0,
    title: '',
    tag: '',
    isActive: true,
    isEditing: false,
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
  async onRowAdd(dataSource: ITarrifParameter) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.tariffParameterManagerAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: ITarrifParameter) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.tariffParameterManagerEdit, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.branchesService.verificationService.tarrifParameter(this.tariffParameterReq))
      MathS.isNull(this.config.data) ? this.onRowAdd(this.tariffParameterReq) : this.onRowEdit(this.tariffParameterReq)
  }
  ngOnInit(): void {
    if (this.config.data) {
      this.tariffParameterReq = this.config.data;
      // isEditing = true; should be last line
      this.tariffParameterReq.isEditing = true;
    }
  }
}