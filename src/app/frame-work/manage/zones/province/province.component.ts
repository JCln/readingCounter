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
  nullSavedSource = () => this.closeTabService.saveDataForProvince = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForProvince) {
      this.closeTabService.saveDataForProvince = await this.sectorsManagerService.getSectorsDataSource(ENInterfaces.ProvinceGET);
    }
    this.countryDictionary = await this.sectorsManagerService.getCountryDictionary();

    Converter.convertIdToTitle(this.closeTabService.saveDataForProvince, this.countryDictionary, 'countryId');
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForProvince = this.closeTabService.saveDataForProvince.slice(0, index).concat(this.closeTabService.saveDataForProvince.slice(index + 1));
  removeRow = async (rowData: object) => {
    const a = await this.sectorsManagerService.firstConfirmDialog('عنوان: ' + rowData['dataSource'].title);
    if (a) {
      await this.sectorsManagerService.deleteSingleRow(ENInterfaces.ProvinceREMOVE, rowData['dataSource'].id);
      this.refetchTable(rowData['ri']);
    }
  }
  onRowEditInit(dataSource: any) {
    // this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.sectorsManagerService.verification(dataSource['dataSource'])) {
      this.closeTabService.saveDataForProvince[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (typeof dataSource['dataSource'].countryId !== 'object') {
      this.countryDictionary.find(item => {
        if (item.title === dataSource['dataSource'].countryId)
          dataSource['dataSource'].countryId = item.id
      })
    } else {
      dataSource['dataSource'].countryId = dataSource['dataSource'].countryId['id'];
    }

    await this.sectorsManagerService.addOrEditCountry(ENInterfaces.ProvinceEDIT, dataSource['dataSource']);

    Converter.convertIdToTitle(this.closeTabService.saveDataForProvince, this.countryDictionary, 'countryId');
  }
  onRowEditCancel() {
    // this.closeTabService.saveDataForProvince[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
    // delete this.closeTabService.saveDataForProvince[dataSource['dataSource'].id];
    // return;
  }

}
