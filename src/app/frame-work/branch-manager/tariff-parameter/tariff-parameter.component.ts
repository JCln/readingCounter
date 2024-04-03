import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { TariffParameterAddDgComponent } from './tariff-parameter-add-dg/tariff-parameter-add-dg.component';
import { TariffParameterEditDgComponent } from './tariff-parameter-edit-dg/tariff-parameter-edit-dg.component';

@Component({
  selector: 'app-tariff-parameter',
  templateUrl: './tariff-parameter.component.html',
  styleUrls: ['./tariff-parameter.component.scss']
})
export class TariffParameterComponent extends FactoryONE {
  ref: DynamicDialogRef;

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    private dialogService: DialogService,
  ) {
    super();
  }
  callAPI = async () => {
    this.closeTabService.tarrifParameter = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.tariffParameterManagerGet);
  }
  openAddDialog = () => {
    this.ref = this.dialogService.open(TariffParameterAddDgComponent, {
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
    this.ref = this.dialogService.open(TariffParameterEditDgComponent, {
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
    if (MathS.isNull(this.closeTabService.tarrifParameter)) {
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
