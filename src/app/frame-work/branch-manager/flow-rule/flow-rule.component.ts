import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { Component } from '@angular/core';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { Converter } from 'src/app/classes/converter';
import { BranchesService } from 'services/branches.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FlowRuleDgComponent } from './flow-rule-dg/flow-rule-dg.component';
import { IFlowRule, IFlowState } from 'interfaces/i-branch';

@Component({
  selector: 'app-flow-rule',
  templateUrl: './flow-rule.component.html',
  styleUrls: ['./flow-rule.component.scss']
})
export class FlowRuleComponent extends FactoryONE {
  offeringGroupIdDictionary: any[] = [];
  flowState: any[] = [];
  flowActivityDictionary: any[] = [];
  ref: DynamicDialogRef;

  constructor(
    public branchesService: BranchesService,
    public closeTabService: CloseTabService,
    private dialogService: DialogService,
  ) {
    super();
  }

  openDialog = (item?: any) => {
    this.ref = this.dialogService.open(FlowRuleDgComponent, {
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
  removeRow = async (rowData: IFlowRule) => {
    const a = await this.branchesService.firstConfirmDialog('از وضعیت :' + rowData.fromFlowStateId + 'به وضعیت :' + rowData.toFlowStateId);
    if (a) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.flowRuleRemove, rowData);
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }

  insertToAuxId = () => {
    this.closeTabService.flowRule.forEach(item => {
      item.changableOfferingGroupId = item.offeringGroupId;
      item.changableFromFlow = item.fromFlowStateId;
      item.changableToFlow = item.toFlowStateId;
      item.changableFlowActivityId = item.flowActivityId;
    })
  }
  classWrapper = async () => {
    this.offeringGroupIdDictionary = await this.branchesService.dictionaryWrapperService.getOfferingGroup(false);
  }
  verification = async () => {
    const temp = this.branchesService.verificationService.flowRuleReq(this.closeTabService.flowRuleReq);
    if (temp)
      this.callAPI();
  }
  callAPI = async () => {
    this.closeTabService.flowRule = await this.branchesService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.flowRuleGet, this.closeTabService.flowRuleReq.offeringGroupId);
    this.flowState = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.flowStateGet);
    this.flowActivityDictionary = await this.branchesService.dictionaryWrapperService.getFlowActivityDictionary(false);
    this.insertToAuxId();
    Converter.convertIdToTitle(this.closeTabService.flowRule, this.offeringGroupIdDictionary, 'changableOfferingGroupId');//TODO WHAT SHOULD CONVERT
    Converter.convertIdToTitle(this.closeTabService.flowRule, this.flowState, 'changableFromFlow');
    Converter.convertIdToTitle(this.closeTabService.flowRule, this.flowActivityDictionary, 'changableFlowActivityId');
    Converter.convertIdToTitle(this.closeTabService.flowRule, this.flowState, 'changableToFlow');
  }


}
