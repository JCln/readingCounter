import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IFlowRule } from 'interfaces/i-branch';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-flow-rule-dg',
  templateUrl: './flow-rule-dg.component.html',
  styleUrls: ['./flow-rule-dg.component.scss']
})
export class FlowRuleDgComponent implements OnInit {
  flowState: any[] = [];
  offeringGroupDictionary: IDictionaryManager[] = [];

  flowRuleReq: IFlowRule = {
    id: 0,
    isEditing: false,
    changableOfferingGroupId: null,
    isStart: false,
    isEnd: false,
    condition: '',
    fromFlowStateId: null,
    toFlowStateId: null,
    offeringGroupId: null,
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
  async onRowAdd(dataSource: IFlowRule) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.flowRuleAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: IFlowRule) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.flowRuleEdit, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.branchesService.verificationService.flowRule(this.flowRuleReq))
      MathS.isNull(this.config.data) ? this.onRowAdd(this.flowRuleReq) : this.onRowEdit(this.flowRuleReq)
  }
  classWrapper = async () => {
    this.flowState = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.flowStateGet);
    this.offeringGroupDictionary = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.offeringGroupGet);
  }
  ngOnInit(): void {
    if (this.config.data) {
      this.flowRuleReq = this.config.data;
      // isEditing = true; should be last line
      this.flowRuleReq.isEditing = true;
    }
    this.classWrapper();
  }
}