import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ICountryManager } from 'interfaces/izones';
import { CloseTabService } from 'services/close-tab.service';
import { SectorsManagerService } from 'services/sectors-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

import { CountryAddDgComponent } from './country-add-dg/country-add-dg.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent extends FactoryONE {

  clonedProducts: { [s: string]: ICountryManager; } = {};

  constructor(
    private dialog: MatDialog,

    public closeTabService: CloseTabService,
    private sectorsManagerService: SectorsManagerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(CountryAddDgComponent, { disableClose: true, minWidth: '19rem' });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForCountry = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForCountry) {
      this.closeTabService.saveDataForCountry = await this.sectorsManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.CountryGET);
    }
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForCountry = this.closeTabService.saveDataForCountry.slice(0, index).concat(this.closeTabService.saveDataForCountry.slice(index + 1));
  removeRow = async (rowData: object) => {
    const a = await this.sectorsManagerService.firstConfirmDialog('عنوان: ' + rowData['dataSource'].title);
    if (a) {
      await this.sectorsManagerService.postByIdSuccessBool(ENInterfaces.CountryREMOVE, rowData['dataSource'].id);
      this.refetchTable(rowData['ri']);
    }
  }
  onRowEditInit(dataSource: any) {
    // this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.sectorsManagerService.verification(dataSource['dataSource'])) {
      this.closeTabService.saveDataForCountry[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    await this.sectorsManagerService.postObjectBySuccessMessage(ENInterfaces.CountryEDIT, dataSource['dataSource']);
  }
  onRowEditCancel() {
    // this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
    // delete this.dataSource[dataSource['dataSource'].id];
    // return;
  }

}