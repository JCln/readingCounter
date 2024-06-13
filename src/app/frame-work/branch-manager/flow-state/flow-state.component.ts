import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { FlowStateDgComponent } from './flow-state-dg/flow-state-dg.component';
import { IFlowState } from 'interfaces/i-branch';

@Component({
  selector: 'app-flow-state',
  templateUrl: './flow-state.component.html',
  styleUrls: ['./flow-state.component.scss']
})
export class FlowStateComponent extends FactoryONE {
  ref: DynamicDialogRef;

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    private dialogService: DialogService,
  ) {
    super();
  }
  callAPI = async () => {
    this.closeTabService.flowState = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.flowStateGet);
  }
  openDialog = (item?: any) => {
    this.ref = this.dialogService.open(FlowStateDgComponent, {
      data: item,
      rtl: true,
      contentStyle: { minWidth: '21rem' }
    })
    this.ref.onClose.subscribe(async res => {
      if (res) {
        this.callAPI();
      }
    });
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.flowState)) {
      this.callAPI();
    }
  }
  removeRow = async (rowData: IFlowState) => {
    const a = await this.branchesService.firstConfirmDialog('عنوان: ' + rowData.title);
    if (a) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.flowStateRemove, rowData);
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }

}
