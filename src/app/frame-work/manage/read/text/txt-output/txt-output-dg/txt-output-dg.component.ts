import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { ITextOutput } from 'interfaces/ireads-manager';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-txt-output-dg',
  templateUrl: './txt-output-dg.component.html',
  styleUrls: ['./txt-output-dg.component.scss']
})
export class TxtOutputDgComponent implements OnInit {
  txtOutReq: ITextOutput = {
    id: null,
    columnId: 0,
    zoneId: null,
    dynamicId: null,
    itemTitle: '',
    startIndex: null,
    endIndex: null,
    length: null,
    isEditing: false
  }
  zoneDictionary: IDictionaryManager[] = [];

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
  async onRowAdd(dataSource: ITextOutput) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.textOutputAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: ITextOutput) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.textOutputEdit, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    this.txtOutReq.id = Number(this.txtOutReq.id);
    this.txtOutReq.startIndex = Number(this.txtOutReq.startIndex);
    this.txtOutReq.endIndex = Number(this.txtOutReq.endIndex);
    this.txtOutReq.length = Number(this.txtOutReq.length);
    if (this.branchesService.verificationService.verificationTextOutput(this.txtOutReq)) {
      MathS.isNull(this.config.data) ? this.onRowAdd(this.txtOutReq) : this.onRowEdit(this.txtOutReq)
    }
  }
  getDictionary = async () => {
    this.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
  }
  ngOnInit(): void {
    this.getDictionary();
    if (this.config.data) {
      this.txtOutReq = this.config.data;
      // isEditing = true; should be last line
      this.txtOutReq.isEditing = true;
    }
  }
}