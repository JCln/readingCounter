import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IProvinceManager } from 'interfaces/izones';
import { CloseTabService } from 'services/close-tab.service';
import { SectorsManagerService } from 'services/sectors-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { ProvinceAddDgComponent } from './province-add-dg/province-add-dg.component';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss']
})
export class ProvinceComponent extends FactoryONE {
  countryDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IProvinceManager; } = {};

  constructor(
    private dialog: MatDialog,
    public closeTabService: CloseTabService,
    private sectorsManagerService: SectorsManagerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(ProvinceAddDgComponent,
        {
          disableClose: true,
          minWidth: '65vw',
          data: {
            di: this.countryDictionary
          }

        });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }
  async convertion() {
    this.countryDictionary = await this.sectorsManagerService.dictionaryWrapperService.getCountryDictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForProvince, this.countryDictionary, 'dynamicId');
  }
  insertToAux = () => {
    this.closeTabService.saveDataForProvince.forEach(item => {
      item.dynamicId = item.countryId;
    })
  }
  callAPI = async () => {
    this.closeTabService.saveDataForProvince = await this.sectorsManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.ProvinceGET);
    this.insertToAux();
    this.convertion();
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForProvince)) {
      this.callAPI();
    }
    this.convertion();
  }
  removeRow = async (rowData: object) => {
    const a = await this.sectorsManagerService.firstConfirmDialog('عنوان: ' + rowData['dataSource'].title);
    if (a) {
      await this.sectorsManagerService.postByIdSuccessBool(ENInterfaces.ProvinceREMOVE, rowData['dataSource'].id);
      this.callAPI();
    }
  }
  onRowEditInit(dataSource: any) {
    // this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (this.sectorsManagerService.verification(dataSource['dataSource'])) {
      const res = await this.sectorsManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ProvinceEDIT, dataSource['dataSource']);
      this.sectorsManagerService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }
  onRowEditCancel() {
    // this.closeTabService.saveDataForProvince[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
    // delete this.closeTabService.saveDataForProvince[dataSource['dataSource'].id];
    // return;
  }

}
