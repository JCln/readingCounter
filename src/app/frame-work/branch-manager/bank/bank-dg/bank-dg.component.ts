import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IBank } from 'interfaces/i-branch';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-bank-dg',
  templateUrl: './bank-dg.component.html',
  styleUrls: ['./bank-dg.component.scss']
})
export class BankDgComponent implements OnInit {
  bankReq: IBank = {
    id: 0,
    title: '',
    code: null,
    css: '',
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
  async onRowAdd(dataSource: IBank) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.bankAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: IBank) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.bankEdit, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.branchesService.verificationService.bank(this.bankReq))
      MathS.isNull(this.config.data) ? this.onRowAdd(this.bankReq) : this.onRowEdit(this.bankReq)
  }
  ngOnInit(): void {
    if (this.config.data) {
      this.bankReq = this.config.data;
      // isEditing = true; should be last line
      this.bankReq.isEditing = true;
    }
  }
}