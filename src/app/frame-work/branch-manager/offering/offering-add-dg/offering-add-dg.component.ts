import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IOffering, IOfferingUnit } from 'interfaces/i-branch';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { ColumnManager } from 'src/app/classes/column-manager';

@Component({
  selector: 'app-offering-add-dg',
  templateUrl: './offering-add-dg.component.html',
  styleUrls: ['./offering-add-dg.component.scss']
})
export class OfferingAddDgComponent implements OnInit {
  offeringUnitIdDictionary: IOfferingUnit[] = [];
  offeringReq: IOffering = {
    id: 0,
    title: '',
    description: '',
    offeringUnit: null,
    offeringUnitId: 0,
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
  async onRowAdd(dataSource: IOffering) {
    const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.offeringAdd, dataSource);
    if (res) {
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.closeSuccess();
    }
  }
  verification = () => {
    if (this.branchesService.verificationService.offering(this.offeringReq))
      this.onRowAdd(this.offeringReq);
  }
  getDictionary = async () => {
    this.offeringUnitIdDictionary = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.offeringUnitGet);
    console.log(this.offeringUnitIdDictionary);

  }
  ngOnInit(): void {
    this.getDictionary();
  }
}