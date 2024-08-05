import { BranchesService } from 'services/branches.service';
import { Component } from '@angular/core';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TarriftypeAddDgComponent } from './tarriftype-add-dg/tarriftype-add-dg.component';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { Converter } from 'src/app/classes/converter';

@Component({
  selector: 'app-tarrif-type-item',
  templateUrl: './tarrif-type-item.component.html',
  styleUrls: ['./tarrif-type-item.component.scss']
})
export class TarrifTypeItemComponent extends FactoryONE {
  ref: DynamicDialogRef;
  getTarrifCalculationModeDictionary: any[] = [];
  getTarrifInsertModeDictionary: any[] = [];
  getTarrifTypeDictionary: any[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    private dialogService: DialogService,
  ) {
    super();
  }
  insertToAux = () => {
    this.closeTabService.tarrifTypeItem.forEach(item => {
      item.dynamicTariffCalculationMode = item.tariffCalculationMode;
      item.dynamicTariffInsertMode = item.insertMode;
      item.dynamicTariffTypeId = item.tariffTypeId;
    })
  }
  callAPI = async () => {
    this.closeTabService.tarrifTypeItem = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.tarriffTypeItemManagerGet);
    this.getTarrifCalculationModeDictionary = this.branchesService.utilsService.getTarrifCalculationModeDictionary();
    this.getTarrifInsertModeDictionary = this.branchesService.utilsService.getTarrifInsertModeDictionary();
    this.getTarrifTypeDictionary = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.tariffTypeAll);
    this.insertToAux();
    Converter.convertIdToTitle(this.closeTabService.tarrifTypeItem, this.getTarrifCalculationModeDictionary, 'dynamicTariffCalculationMode');
    Converter.convertIdToTitle(this.closeTabService.tarrifTypeItem, this.getTarrifTypeDictionary, 'dynamicTariffTypeId');
    Converter.convertIdToTitle(this.closeTabService.tarrifTypeItem, this.getTarrifInsertModeDictionary, 'dynamicTariffInsertMode');
    // Converter.convertIdsToTitlesByIdname(this.closeTabService.tarrifTypeItem,
    //   {
    //     getTarrifCalculationModeDictionary: 'getTarrifCalculationModeDictionary',
    //     getTarrifTypeDictionary: 'getTarrifTypeDictionary'
    //   },
    //   {
    //     tariffCalculationMode: 'tariffCalculationMode',
    //     tariffTypeId: 'tariffTypeId',
    //   },
    //   'dynamicId')
  }
  openDialog = (item?: any) => {
    this.ref = this.dialogService.open(TarriftypeAddDgComponent, {
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
    if (MathS.isNull(this.closeTabService.tarrifTypeItem)) {
      this.callAPI();
    }
  }
  removeRow = async (rowData: object) => {
    const a = await this.branchesService.firstConfirmDialog('عنوان: ' + rowData['title']);
    if (a) {
      const res = await this.branchesService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.tarriffTypeItemManagerRemove, rowData);
      this.branchesService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }

}
