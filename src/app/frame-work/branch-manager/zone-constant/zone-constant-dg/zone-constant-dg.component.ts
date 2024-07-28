import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IZoneConstants } from 'interfaces/i-branch';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-zone-constant-dg',
  templateUrl: './zone-constant-dg.component.html',
  styleUrls: ['./zone-constant-dg.component.scss']
})
export class ZoneConstantDgComponent implements OnInit {
  zoneConstantReq: IZoneConstants = {
    id: 0,
    title: '',
    value: '',
    tag: '',
    zoneId: null,
    zoneTitle: '',
    isEditing: false
  }
  zoneDictionary: IDictionaryManager[] = []
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
  async onRowAdd(dataSource: IZoneConstants) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ZoneConstantAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: IZoneConstants) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ZoneConstantEdit, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.branchesService.verificationService.zoneConstatns(this.zoneConstantReq))
      MathS.isNull(this.config.data) ? this.onRowAdd(this.zoneConstantReq) : this.onRowEdit(this.zoneConstantReq)
  }
  getDictionary = async () => {
    this.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
  }
  ngOnInit(): void {
    this.getDictionary();
    if (this.config.data) {
      this.zoneConstantReq = this.config.data;
      // isEditing = true; should be last line
      this.zoneConstantReq.isEditing = true;
    }
  }
}