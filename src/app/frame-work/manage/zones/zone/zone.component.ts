import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IZoneManager } from 'interfaces/izones';
import { CloseTabService } from 'services/close-tab.service';
import { SectorsManagerService } from 'services/sectors-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { ZoneAddDgComponent } from './zone-add-dg/zone-add-dg.component';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent extends FactoryONE {
  dataSource: IZoneManager[] = [];

  regionDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IZoneManager; } = {};

  constructor(
    private dialog: MatDialog,
    private closeTabService: CloseTabService,
    private sectorsManagerService: SectorsManagerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(ZoneAddDgComponent,
        {
          disableClose: true,
          minWidth: '65vw',
          data: {
            di: this.regionDictionary
          }

        });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForZone = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForZone) {
      this.dataSource = this.closeTabService.saveDataForZone;
    }
    else {
      this.dataSource = await this.sectorsManagerService.getSectorsDataSource(ENInterfaces.ZoneGET);
      this.closeTabService.saveDataForZone = this.dataSource;
    }
    this.regionDictionary = await this.sectorsManagerService.getRegionDictionary();

    Converter.convertIdToTitle(this.dataSource, this.regionDictionary, 'regionId');
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.sectorsManagerService.firstConfirmDialog();

    if (a) {
      await this.sectorsManagerService.deleteSingleRow(ENInterfaces.ZoneREMOVE, rowDataAndIndex['dataSource']);
      this.refetchTable(rowDataAndIndex['ri']);
    }
  }
  onRowEditInit(dataSource: any) {
    // this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.sectorsManagerService.verification(dataSource['dataSource'])) {
      this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (typeof dataSource['dataSource'].regionId !== 'object') {
      this.regionDictionary.find(item => {
        if (item.title === dataSource['dataSource'].regionId)
          dataSource['dataSource'].regionId = item.id
      })
    } else {
      dataSource['dataSource'].regionId = dataSource['dataSource'].regionId['id'];
    }
    await this.sectorsManagerService.addOrEditCountry(ENInterfaces.ZoneEDIT, dataSource['dataSource']);
    Converter.convertIdToTitle(this.dataSource, this.regionDictionary, 'regionId');
  }
  onRowEditCancel() {
    // this.dataSource[rowDataAndIndex['ri']] = this.clonedProducts[rowDataAndIndex['dataSource']];
    // delete this.dataSource[rowDataAndIndex['dataSource']];
    // return;
  }

}

