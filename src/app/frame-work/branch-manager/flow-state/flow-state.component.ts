import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { FlowStateDgComponent } from './flow-state-dg/flow-state-dg.component';
import { IFlowState } from 'interfaces/i-branch';
import { Converter } from 'src/app/classes/converter';

@Component({
  selector: 'app-flow-state',
  templateUrl: './flow-state.component.html',
  styleUrls: ['./flow-state.component.scss']
})
export class FlowStateComponent extends FactoryONE {
  ref: DynamicDialogRef;
  flowActivityDictionary: any[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    private dialogService: DialogService,
  ) {
    super();
  }
  insertToAuxId = () => {
    this.closeTabService.flowState.forEach(item => {
      item.changableFlowActivityId = item.flowActivityId;
    })
  }
  callAPI = async () => {
    this.closeTabService.flowState = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.flowStateGet);
    this.flowActivityDictionary = await this.branchesService.dictionaryWrapperService.getFlowActivityDictionary(false);
    this.insertToAuxId();
    Converter.convertIdToTitle(this.closeTabService.flowState, this.flowActivityDictionary, 'changableFlowActivityId');
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
    const a = await this.branchesService.firstConfirmDialog('عنوان: ' + rowData.title + '، فعالیت: ' + rowData.changableFlowActivityId);
    if (a) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.flowStateRemove, rowData);
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }

}
