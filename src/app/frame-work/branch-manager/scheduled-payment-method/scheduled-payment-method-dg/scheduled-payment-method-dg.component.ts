import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IScheduledPaymentMethod } from 'interfaces/i-branch';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-scheduled-payment-method-dg',
  templateUrl: './scheduled-payment-method-dg.component.html',
  styleUrls: ['./scheduled-payment-method-dg.component.scss']
})
export class ScheduledPaymentMethodDgComponent implements OnInit {
  schedulePaymentReq: IScheduledPaymentMethod = {
    id: 0,
    title: '',
    isActive: true,
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
  async onRowAdd(dataSource: IScheduledPaymentMethod) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.scheduledPaymentMethodAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: IScheduledPaymentMethod) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.scheduledPaymentMethodEdit, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.branchesService.verificationService.scheduledPaymentMethod(this.schedulePaymentReq))
      MathS.isNull(this.config.data) ? this.onRowAdd(this.schedulePaymentReq) : this.onRowEdit(this.schedulePaymentReq)
  }
  ngOnInit(): void {
    if (this.config.data) {
      this.schedulePaymentReq = this.config.data;
      // isEditing = true; should be last line
      this.schedulePaymentReq.isEditing = true;
    }
  }
}