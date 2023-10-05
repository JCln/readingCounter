import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IZoneBoundManager } from 'interfaces/izones';
import { CloseTabService } from 'services/close-tab.service';
import { SectorsManagerService } from 'services/sectors-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { ZoneBoundAddDgComponent } from './zone-bound-add-dg/zone-bound-add-dg.component';

@Component({
  selector: 'app-zone-bound',
  templateUrl: './zone-bound.component.html',
  styleUrls: ['./zone-bound.component.scss']
})
export class ZoneBoundComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];

  clonedProducts: { [s: string]: IZoneBoundManager; } = {};

  constructor(
    private dialog: MatDialog,
    public closeTabService: CloseTabService,
    private sectorsManagerService: SectorsManagerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(ZoneBoundAddDgComponent,
        {
          disableClose: true,
          minWidth: '65vw',
          data: {
            di: this.zoneDictionary
          }

        });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForZoneBound = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForZoneBound) {
      this.closeTabService.saveDataForZoneBound = await this.sectorsManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.ZoneBoundGET);
    }
    this.zoneDictionary = await this.sectorsManagerService.dictionaryWrapperService.getZoneDictionary();

    Converter.convertIdToTitle(this.closeTabService.saveDataForZoneBound, this.zoneDictionary, 'zoneId');
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForZoneBound = this.closeTabService.saveDataForZoneBound.slice(0, index).concat(this.closeTabService.saveDataForZoneBound.slice(index + 1));
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.sectorsManagerService.firstConfirmDialog('عنوان: ' + rowDataAndIndex['dataSource'].title + '،  ناحیه: ' + rowDataAndIndex['dataSource'].zoneId);

    if (a) {
      await this.sectorsManagerService.postByIdSuccessBool(ENInterfaces.ZoneBoundREMOVE, rowDataAndIndex['dataSource'].id);
      this.refetchTable(rowDataAndIndex['ri']);
    }
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.sectorsManagerService.verification(dataSource['dataSource'])) {
      this.closeTabService.saveDataForZoneBound[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (typeof dataSource['dataSource'].zoneId !== 'object') {
      this.zoneDictionary.find(item => {
        if (item.title === dataSource['dataSource'].zoneId)
          dataSource['dataSource'].zoneId = item.id
      })
    } else {
      dataSource['dataSource'].zoneId = dataSource['dataSource'].zoneId['id'];
    }
    const res = await this.sectorsManagerService.postObjectBySuccessMessage(ENInterfaces.ZoneBoundEDIT, dataSource['dataSource']);
    if (res)
      Converter.convertIdToTitle(this.closeTabService.saveDataForZoneBound, this.zoneDictionary, 'zoneId');
  }
  onRowEditCancel() {
    // this.closeTabService.saveDataForZoneBound[rowDataAndIndex['ri']] = this.clonedProducts[rowDataAndIndex['dataSource']];
    // delete this.closeTabService.saveDataForZoneBound[rowDataAndIndex['dataSource']];
    // return;
  }

}