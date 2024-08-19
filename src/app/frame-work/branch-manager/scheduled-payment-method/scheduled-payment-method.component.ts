import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { ScheduledPaymentMethodDgComponent } from './scheduled-payment-method-dg/scheduled-payment-method-dg.component';
@Component({
  selector: 'app-scheduled-payment-method',
  templateUrl: './scheduled-payment-method.component.html',
  styleUrls: ['./scheduled-payment-method.component.scss']
})
export class ScheduledPaymentMethodComponent extends FactoryONE {
  ref: DynamicDialogRef;
  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    public dialogService: DialogService
  ) {
    super();
  }

  callAPI = async () => {
    this.closeTabService.scheduledPaymentMethod = await this.branchesService.dictionaryWrapperService.getScheduledPaymentMethodDictionary(true);
  }
  openDialog = (item?: any) => {
    this.ref = this.dialogService.open(ScheduledPaymentMethodDgComponent, {
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
    if (MathS.isNull(this.closeTabService.scheduledPaymentMethod)) {
      this.callAPI();
    }
  }
  removeRow = async (rowData: object) => {
    if (await this.branchesService.firstConfirmDialog('عنوان: ' + rowData['title'])) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.scheduledPaymentMethodRemove, rowData);
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }

}
