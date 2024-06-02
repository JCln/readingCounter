import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { TariffTypeDgComponent } from './tariff-type-dg/tariff-type-dg.component';

@Component({
  selector: 'app-tariff-type',
  templateUrl: './tariff-type.component.html',
  styleUrls: ['./tariff-type.component.scss']
})
export class TariffTypeComponent extends FactoryONE {
  ref: DynamicDialogRef;

  constructor(
    public dialogService: DialogService,
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
  ) {
    super();
  }

  callAPI = async () => {
    this.closeTabService.tariffType = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.tariffTypeAll);
  }
  openDialog = (item?: any) => {
    this.ref = this.dialogService.open(TariffTypeDgComponent, {
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
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.tariffType)) {
      this.callAPI();
    }
  }
  removeRow = async (rowData: object) => {
    if (await this.branchesService.firstConfirmDialog('عنوان: ' + rowData['title'])) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.tariffTypeRemove, rowData);
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }

}
