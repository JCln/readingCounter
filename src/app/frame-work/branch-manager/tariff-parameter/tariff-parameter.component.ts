import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { TariffParameterAddDgComponent } from './tariff-parameter-add-dg/tariff-parameter-add-dg.component';

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
    this.closeTabService.tariffParameter = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.tariffParameterManagerGet);
  }
  openDialog = (item?: any) => {
    this.ref = this.dialogService.open(TariffParameterAddDgComponent, {
      data: item,
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
    if (MathS.isNull(this.closeTabService.tariffParameter)) {
      this.callAPI();
    }
  }
  removeRow = async (rowData: object) => {
    const a = await this.branchesService.firstConfirmDialog('عنوان: ' + rowData['title'] + ' tag: ' + rowData['tag']);
    if (a) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.tariffParameterManagerRemove, rowData);
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }

}
