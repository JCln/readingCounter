import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { ICounterReport } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { CrAddDgComponent } from './cr-add-dg/cr-add-dg.component';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-counter-report',
  templateUrl: './counter-report.component.html',
  styleUrls: ['./counter-report.component.scss']
})
export class CounterReportComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: ICounterReport; } = {};

  constructor(
    private dialog: MatDialog,
    public closeTabService: CloseTabService,
    public readManagerService: ReadManagerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(CrAddDgComponent, {
        disableClose: true,
        minWidth: '65vw',
        data: {
          di: this.zoneDictionary
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          this.callAPI();
        }
      });
    });
  }
  insertToAuxZoneid = () => {
    this.closeTabService.saveDataForCounterReport.forEach(item => {
      item.dynamicZoneId = item.zoneId;
    })
  }
  callAPI = async () => {
    this.closeTabService.saveDataForCounterReport = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.CounterReportAll);
    this.insertToAuxZoneid();
    this.zoneDictionary = await this.readManagerService.dictionaryWrapperService.getZoneDictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForCounterReport, this.zoneDictionary, 'dynamicZoneId');
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForCounterReport)) {
      this.callAPI();
    }
  }
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.readManagerService.firstConfirmDialog('عنوان: ' + rowDataAndIndex['dataSource'].title + '،  ناحیه: ' + rowDataAndIndex['dataSource'].dynamicZoneId);
    if (a) {
      await this.readManagerService.deleteSingleRow(ENInterfaces.CounterReportRemove, rowDataAndIndex['dataSource'].id);
      this.callAPI();
    }
  }
  onRowEditCancel() {
    Converter.convertIdToTitle(this.closeTabService.saveDataForCounterReport, this.zoneDictionary, 'dynamicZoneId');
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.readManagerService.verification(dataSource['dataSource'])) {
      this.closeTabService.saveDataForCounterReport[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.CounterReportEdit, dataSource['dataSource']);
    Converter.convertIdToTitle(this.closeTabService.saveDataForCounterReport, this.zoneDictionary, 'dynamicZoneId');
    this.callAPI();
  }

}