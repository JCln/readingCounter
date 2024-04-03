import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOfferingUnit } from 'interfaces/i-branch';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';

@Component({
  selector: 'app-offering-unit-add-dg',
  templateUrl: './offering-unit-add-dg.component.html',
  styleUrls: ['./offering-unit-add-dg.component.scss']
})
export class OfferingUnitAddDgComponent implements OnInit {
  offeringUnitReq: IOfferingUnit = {
    id: 0,
    title: '',
    symbol: '',
    isActive: true
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
  async onRowAdd(dataSource: IOfferingUnit) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.offeringUnitAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.branchesService.verificationService.offeringUnit(this.offeringUnitReq))
      this.onRowAdd(this.offeringUnitReq);
  }
  ngOnInit(): void {

  }
}