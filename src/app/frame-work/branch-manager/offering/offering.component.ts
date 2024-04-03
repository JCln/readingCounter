import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { OfferingAddDgComponent } from './offering-add-dg/offering-add-dg.component';
import { OfferingEditDgComponent } from './offering-edit-dg/offering-edit-dg.component';
import { MathS } from 'src/app/classes/math-s';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';

@Component({
  selector: 'app-offering',
  templateUrl: './offering.component.html',
  styleUrls: ['./offering.component.scss']
})
export class OfferingComponent extends FactoryONE {
  ref: DynamicDialogRef;

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    private dialogService: DialogService,
  ) {
    super();
  }
  callAPI = async () => {
    this.closeTabService.offering = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.offeringGet);
  }
  openAddDialog = () => {
    this.ref = this.dialogService.open(OfferingAddDgComponent, {
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
    this.ref = this.dialogService.open(OfferingEditDgComponent, {
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
    if (MathS.isNull(this.closeTabService.offering)) {
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
