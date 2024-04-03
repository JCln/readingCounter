import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { OfferingUnitAddDgComponent } from './offering-unit-add-dg/offering-unit-add-dg.component';
import { OfferingUnitEditDgComponent } from './offering-unit-edit-dg/offering-unit-edit-dg.component';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-offering-unit',
  templateUrl: './offering-unit.component.html',
  styleUrls: ['./offering-unit.component.scss']
})
export class OfferingUnitComponent extends FactoryONE {
  ref: DynamicDialogRef;

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    private dialogService: DialogService,
  ) {
    super();
  }
  callAPI = async () => {
    this.closeTabService.offeringUnit = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.offeringUnitGet);
  }
  openAddDialog = () => {
    this.ref = this.dialogService.open(OfferingUnitAddDgComponent, {
      rtl: true,
      width: '80%'
    })
    this.ref.onClose.subscribe(async res => {
      if (res) {
        this.callAPI();
      }
    });
  }
  openEditDialog = (row: any) => {
    this.ref = this.dialogService.open(OfferingUnitEditDgComponent, {
      data: row,
      rtl: true,
      width: '80%'
    })
    this.ref.onClose.subscribe(async res => {
      if (res) {
        this.callAPI();
      }
    });
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.offeringUnit)) {
      this.callAPI();
    }
  }
  removeRow = async (rowData: object) => {
    // const a = await this.readManagerService.firstConfirmDialog('ناحیه: ' + rowData['dataSource'].zoneId);
    // if (a) {
    //   await this.readManagerService.deleteSingleRow(ENInterfaces.ReadingConfigREMOVE, rowData['dataSource'].id);
    //   this.callAPI();
    // }
  }

}
