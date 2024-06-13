import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IFlowState } from 'interfaces/i-branch';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-flow-state-dg',
  templateUrl: './flow-state-dg.component.html',
  styleUrls: ['./flow-state-dg.component.scss']
})
export class FlowStateDgComponent implements OnInit {
  flowStateReq: IFlowState = {
    id: 0,
    title: '',
    isInternal: false,
    order: null,
    canGoPrevious: false,
    flowsAutomaticly: false,
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
  async onRowAdd(dataSource: IFlowState) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.tariffParameterManagerAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: IFlowState) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.tariffParameterManagerEdit, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.branchesService.verificationService.flowState(this.flowStateReq))
      MathS.isNull(this.config.data) ? this.onRowAdd(this.flowStateReq) : this.onRowEdit(this.flowStateReq)
  }
  ngOnInit(): void {
    if (this.config.data) {
      this.flowStateReq = this.config.data;
      // isEditing = true; should be last line
      this.flowStateReq.isEditing = true;
    }
  }
}