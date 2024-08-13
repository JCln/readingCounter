import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { BranchesService } from 'services/branches.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { TxtOutputDgComponent } from './txt-output-dg/txt-output-dg.component';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { ITextOutput } from 'interfaces/ireads-manager';
import { Converter } from 'src/app/classes/converter';

@Component({
  selector: 'app-txt-output',
  templateUrl: './txt-output.component.html',
  styleUrls: ['./txt-output.component.scss']
})
export class TxtOutputComponent extends FactoryONE {
  ref: DynamicDialogRef;
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    public dialogService: DialogService
  ) {
    super();
  }

  async convertion() {
    this.zoneDictionary = await this.branchesService.dictionaryWrapperService.getZoneDictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForTextOutput, this.zoneDictionary, 'dynamicId');
  }
  callAPI = async () => {
    this.closeTabService.saveDataForTextOutput = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.textOutputGET);
    this.insertToAux();
    this.convertion();
  }
  openDialog = (item?: any) => {
    this.ref = this.dialogService.open(TxtOutputDgComponent, {
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
  insertToAux = () => {
    this.closeTabService.saveDataForTextOutput.forEach(item => {
      item.dynamicId = item.zoneId;
    })
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForTextOutput)) {
      this.callAPI();
    }
    this.insertToAux();
  }
  removeRow = async (rowData: ITextOutput) => {
    if (await this.branchesService.firstConfirmDialog('عنوان: ' + rowData.itemTitle + ' ناحیه: ' + rowData.dynamicId)) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.textOutputRemove, rowData);
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }

}
