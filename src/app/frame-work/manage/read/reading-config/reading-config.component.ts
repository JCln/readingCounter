import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IReadingConfigDefault } from 'interfaces/iimports';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { RdAddDgComponent } from './rd-add-dg/rd-add-dg.component';
import { RdEditDgComponent } from './rd-edit-dg/rd-edit-dg.component';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-reading-config',
  templateUrl: './reading-config.component.html',
  styleUrls: ['./reading-config.component.scss']
})
export class ReadingConfigComponent extends FactoryONE {

  editableDataSource = [];
  zoneDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IReadingConfigDefault; } = {};

  constructor(
    private dialog: MatDialog,
    public closeTabService: CloseTabService,
    public readManagerService: ReadManagerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(RdAddDgComponent, {
        disableClose: true,
        minWidth: '65vw',
        width: '100%',
        data: {
          di: this.zoneDictionary
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.callAPI();
      });
    });
  }
  openEditDialog = (row: any) => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(RdEditDgComponent, {
        disableClose: true,
        minWidth: '65vw',
        width: '100%',
        data: {
          row,
          di: this.zoneDictionary
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          if (await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.ReadingConfigEDIT, result)) {
            this.callAPI();
          }
        }
      });
    })
  }
  insertToAuxZoneid = () => {
    this.closeTabService.saveDataForReadingConfig.forEach(item => {
      item.staticID = item.zoneId;
    })
  }
  callAPI = async () => {
    this.closeTabService.saveDataForReadingConfig = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.ReadingConfigALL);
    this.zoneDictionary = await this.readManagerService.dictionaryWrapperService.getZoneDictionary();
    this.insertToAuxZoneid();

    Converter.convertIdToTitle(this.closeTabService.saveDataForReadingConfig, this.zoneDictionary, 'zoneId');
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForReadingConfig)) {
      this.callAPI();
    }
  }
  removeRow = async (rowData: object) => {
    const a = await this.readManagerService.firstConfirmDialog('ناحیه: ' + rowData['dataSource'].zoneId);
    if (a) {
      await this.readManagerService.deleteSingleRow(ENInterfaces.ReadingConfigREMOVE, rowData['dataSource'].id);
      this.callAPI();
    }
  }

}
