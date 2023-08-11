import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IReadingPeriod } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { RpmAddDgComponent } from './rpm-add-dg/rpm-add-dg.component';

@Component({
  selector: 'app-reading-period',
  templateUrl: './reading-period.component.html',
  styleUrls: ['./reading-period.component.scss']
})
export class ReadingPeriodComponent extends FactoryONE {

  zoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IReadingPeriod; } = {};

  constructor(
    private dialog: MatDialog,
    public closeTabService: CloseTabService,
    public readManagerService: ReadManagerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(RpmAddDgComponent, {
        disableClose: true,
        minWidth: '65vw',
        data: {
          di: this.zoneDictionary,
          rpkmId: this.readingPeriodKindDictionary
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }
  toConvert = () => {
    this.closeTabService.saveDataForReadingPeriodManager =
      Converter.convertIdsToTitles(
        this.closeTabService.saveDataForReadingPeriodManager,
        {
          zoneDictionary: this.zoneDictionary,
          readingPeriodKindDictionary: this.readingPeriodKindDictionary,
        },
        {
          zoneId: 'zoneId',
          readingPeriodKindId: 'readingPeriodKindId',
        })
  }
  nullSavedSource = () => this.closeTabService.saveDataForReadingPeriodManager = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForReadingPeriodManager) {
      this.closeTabService.saveDataForReadingPeriodManager = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.readingPeriodAll);
    }
    this.zoneDictionary = await this.readManagerService.dictionaryWrapperService.getZoneDictionary();
    this.readingPeriodKindDictionary = await this.readManagerService.dictionaryWrapperService.getPeriodKindDictionary();

    this.toConvert();
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForReadingPeriodManager = this.closeTabService.saveDataForReadingPeriodManager.slice(0, index).concat(this.closeTabService.saveDataForReadingPeriodManager.slice(index + 1));
  removeRow = async (rowData: object) => {
    const a = await this.readManagerService.firstConfirmDialog('عنوان: ' + rowData['dataSource'].title + '،  نوع دوره: ' + rowData['dataSource'].readingPeriodKindId + '،  ناحیه: ' + rowData['dataSource'].zoneId);
    if (a) {
      await this.readManagerService.deleteSingleRow(ENInterfaces.readingPeriodRemove, rowData['dataSource'].id);
      this.refetchTable(rowData['ri']);
    }
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.readManagerService.verification(dataSource['dataSource'])) {
      this.closeTabService.saveDataForReadingPeriodManager['ri'] = this.clonedProducts[dataSource['dataSource'].id];
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
    if (typeof dataSource['dataSource'].readingPeriodKindId !== 'object') {
      this.readingPeriodKindDictionary.find(item => {
        if (item.title === dataSource['dataSource'].readingPeriodKindId)
          dataSource['dataSource'].readingPeriodKindId = item.id
      })
    } else {
      dataSource['dataSource'].readingPeriodKindId = dataSource['dataSource'].readingPeriodKindId['id'];
    }
    await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.readingPeriodEdit, dataSource['dataSource']);
    this.toConvert();
  }

}