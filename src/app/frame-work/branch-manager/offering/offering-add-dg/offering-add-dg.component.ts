import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOffering, IOfferingUnit } from 'interfaces/i-branch';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-offering-add-dg',
  templateUrl: './offering-add-dg.component.html',
  styleUrls: ['./offering-add-dg.component.scss']
})
export class OfferingAddDgComponent implements OnInit {
  offeringUnitIdDictionary: IOfferingUnit[] = [];
  offeringGroupIdDictionary: IOfferingUnit[] = [];
  offeringReq: IOffering = {
    id: 0,
    title: '',
    description: '',
    offeringUnit: null,
    offeringGroup: null,
    dynamicGroupId: null,
    dynamicId: null,
    offeringUnitId: 0,
    offeringGroupId: 0,
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
  async onRowAdd(dataSource: IOffering) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.offeringAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  async onRowEdit(dataSource: IOffering) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.offeringEdit, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.branchesService.verificationService.offering(this.offeringReq)) {
      MathS.isNull(this.config.data) ? this.onRowAdd(this.offeringReq) : this.onRowEdit(this.offeringReq)
    }
  }
  getDictionary = async () => {
    this.offeringUnitIdDictionary = await this.branchesService.dictionaryWrapperService.getOfferingUnit();
    this.offeringGroupIdDictionary = await this.branchesService.dictionaryWrapperService.getOfferingGroup(false);
  }
  ngOnInit(): void {
    this.getDictionary();
    if (this.config.data) {
      this.offeringReq = this.config.data;
      // isEditing = true; should be last line
      this.offeringReq.isEditing = true;
    }
  }
}