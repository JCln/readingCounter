import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IInvoiceType } from 'interfaces/i-branch';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-invoice-type-dg',
  templateUrl: './invoice-type-dg.component.html',
  styleUrls: ['./invoice-type-dg.component.scss']
})
export class InvoiceTypeDgComponent implements OnInit {
  invoiceTypeReq: IInvoiceType = {
    id: 0,
    title: '',
    description: '',
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
  async onRowAdd(dataSource: IInvoiceType) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.invoiceTypeAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: IInvoiceType) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.invoiceTypeEdit, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.branchesService.verificationService.invoiceType(this.invoiceTypeReq))
      MathS.isNull(this.config.data) ? this.onRowAdd(this.invoiceTypeReq) : this.onRowEdit(this.invoiceTypeReq)
  }
  ngOnInit(): void {
    if (this.config.data) {
      this.invoiceTypeReq = this.config.data;
      // isEditing = true; should be last line
      this.invoiceTypeReq.isEditing = true;
    }
  }
}