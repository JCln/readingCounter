import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOfferingGroup } from 'interfaces/i-branch';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-offering-group-dg',
  templateUrl: './offering-group-dg.component.html',
  styleUrls: ['./offering-group-dg.component.scss']
})
export class OfferingGroupDgComponent implements OnInit {
  offeringGroupReq: IOfferingGroup = {
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
  async onRowAdd(dataSource: IOfferingGroup) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.offeringGroupAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: IOfferingGroup) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.offeringGroupEdit, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.branchesService.verificationService.offeringGroup(this.offeringGroupReq))
      MathS.isNull(this.config.data) ? this.onRowAdd(this.offeringGroupReq) : this.onRowEdit(this.offeringGroupReq)
  }
  ngOnInit(): void {
    if (this.config.data) {
      this.offeringGroupReq = this.config.data;
      // isEditing = true; should be last line
      this.offeringGroupReq.isEditing = true;
    }
  }
}