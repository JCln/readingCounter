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
  regionDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IZoneManager; } = {};

  constructor(
    private dialog: MatDialog,
    public closeTabService: CloseTabService,
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
    if (!this.closeTabService.saveDataForZone) {
      this.closeTabService.saveDataForZone = await this.sectorsManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.ZoneGET);
    }
    this.regionDictionary = await this.sectorsManagerService.dictionaryWrapperService.getRegionDictionary();

    Converter.convertIdToTitle(this.closeTabService.saveDataForZone, this.regionDictionary, 'regionId');
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForZone = this.closeTabService.saveDataForZone.slice(0, index).concat(this.closeTabService.saveDataForZone.slice(index + 1));
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.sectorsManagerService.firstConfirmDialog('عنوان: ' + rowDataAndIndex['dataSource'].title + '،  منطقه: ' + rowDataAndIndex['dataSource'].regionId);

    if (a) {
      await this.sectorsManagerService.postByIdSuccessBool(ENInterfaces.ZoneREMOVE, rowDataAndIndex['dataSource'].id);
      this.refetchTable(rowDataAndIndex['ri']);
    }
  }
  onRowEditInit(dataSource: any) {
    // this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.sectorsManagerService.verification(dataSource['dataSource'])) {
      this.closeTabService.saveDataForZone[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
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
    const res = await this.sectorsManagerService.postObjectBySuccessMessage(ENInterfaces.ZoneEDIT, dataSource['dataSource']);
    if (res)
      Converter.convertIdToTitle(this.closeTabService.saveDataForZone, this.regionDictionary, 'regionId');
  }
  onRowEditCancel() {
    // this.closeTabService.saveDataForZone[rowDataAndIndex['ri']] = this.clonedProducts[rowDataAndIndex['dataSource']];
    // delete this.closeTabService.saveDataForZone[rowDataAndIndex['dataSource']];
    // return;
  }

}

