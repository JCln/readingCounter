import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IKarbari } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { KarbariAddDgComponent } from './karbari-add-dg/karbari-add-dg.component';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-karbari',
  templateUrl: './karbari.component.html',
  styleUrls: ['./karbari.component.scss']
})
export class KarbariComponent extends FactoryONE {

  provinceDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IKarbari; } = {};

  constructor(
    private dialog: MatDialog,
    public closeTabService: CloseTabService,
    public readManagerService: ReadManagerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(KarbariAddDgComponent, {
        disableClose: true,
        minWidth: '65vw',
        data: {
          di: this.provinceDictionary
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.callAPI();
      });
    });
  }
  insertToAuxZoneid = () => {
    this.closeTabService.saveDataForKarbari.forEach(item => {
      item.dynamicID = item.provinceId;
    })
  }
  async convertion() {
    this.provinceDictionary = await this.readManagerService.dictionaryWrapperService.getProvinceDictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForKarbari, this.provinceDictionary, 'dynamicID');
  }
  callAPI = async () => {
    this.closeTabService.saveDataForKarbari = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.KarbariAll);
    this.insertToAuxZoneid();
    this.convertion();
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForKarbari)) {
      this.callAPI();
    }
    this.convertion();
  }
  removeRow = async (rowData: object) => {
    const a = await this.readManagerService.firstConfirmDialog('عنوان: ' + rowData['dataSource'].title + '،  استان: ' + rowData['dataSource'].dynamicID);
    if (a) {
      await this.readManagerService.deleteSingleRow(ENInterfaces.KarbariRemove, rowData['dataSource'].id);
      this.callAPI();
    }
  }
  onRowEditInit(dataSource: object) {
    // this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: IKarbari) => {
    if (!this.readManagerService.verification(dataSource)) {
      this.closeTabService.saveDataForKarbari[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.KarbariEdit, dataSource['dataSource']);
    this.callAPI();
  }

}