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
import { MathS } from 'src/app/classes/math-s';

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
          this.callAPI()
      });
    });
  }
  callDictionaries = async () => {
    this.zoneDictionary = await this.sectorsManagerService.dictionaryWrapperService.getZoneDictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForZoneBound, this.zoneDictionary, 'dynamicId');
  }
  insertToAux = () => {
    this.closeTabService.saveDataForZoneBound.forEach(item => {
      item.dynamicId = item.zoneId;
    })
  }

  callAPI = async () => {
    this.closeTabService.saveDataForZoneBound = await this.sectorsManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.ZoneBoundGET);
    this.insertToAux();
    this.callDictionaries();
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForZoneBound)) {
      this.callAPI();
    }
    this.callDictionaries();
  }
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.sectorsManagerService.firstConfirmDialog('عنوان: ' + rowDataAndIndex['dataSource'].title + '،  ناحیه: ' + rowDataAndIndex['dataSource'].dynamicId);

    if (a) {
      await this.sectorsManagerService.postByIdSuccessBool(ENInterfaces.ZoneBoundREMOVE, rowDataAndIndex['dataSource'].id);
      this.callAPI()
    }
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (this.sectorsManagerService.verification(dataSource['dataSource'])) {
      const res = await this.sectorsManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ZoneBoundEDIT, dataSource['dataSource']);
      this.sectorsManagerService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI()
    }
  }
  onRowEditCancel() {
    // this.closeTabService.saveDataForZoneBound[rowDataAndIndex['ri']] = this.clonedProducts[rowDataAndIndex['dataSource']];
    // delete this.closeTabService.saveDataForZoneBound[rowDataAndIndex['dataSource']];
    // return;
  }

}