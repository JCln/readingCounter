import { BranchesService } from 'services/branches.service';
import { Component } from '@angular/core';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TarriftypeAddDgComponent } from './tarriftype-add-dg/tarriftype-add-dg.component';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { TarriftypeEditDgComponent } from './tarriftype-edit-dg/tarriftype-edit-dg.component';
import { Converter } from 'src/app/classes/converter';

@Component({
  selector: 'app-tarrif-type-item',
  templateUrl: './tarrif-type-item.component.html',
  styleUrls: ['./tarrif-type-item.component.scss']
})
export class TarrifTypeItemComponent extends FactoryONE {
  ref: DynamicDialogRef;
  getTarrifCalculationModeDictionary: any[] = [];
  getTarrifTypeDictionary: any[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public branchesService: BranchesService,
    private dialogService: DialogService,
  ) {
    super();
  }
  callAPI = async () => {
    this.closeTabService.tarrifTypeItem = await this.branchesService.ajaxReqWrapperService.getDataSource(ENInterfaces.tarriffTypeItemManagerGet);
    this.getTarrifCalculationModeDictionary = this.branchesService.utilsService.getTarrifCalculationModeDictionary();
    this.getTarrifTypeDictionary = this.branchesService.utilsService.getTarrifTypeDictionary();
    Converter.convertIdToTitle(this.closeTabService.tarrifTypeItem, this.getTarrifCalculationModeDictionary, 'tariffCalculationMode');
    Converter.convertIdToTitle(this.closeTabService.tarrifTypeItem, this.getTarrifTypeDictionary, 'tariffTypeId');
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
  openAddDialog = () => {
    this.ref = this.dialogService.open(TarriftypeAddDgComponent, {
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
    this.ref = this.dialogService.open(TarriftypeEditDgComponent, {
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
