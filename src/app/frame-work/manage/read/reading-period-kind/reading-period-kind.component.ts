import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IReadingPeriodKind } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

import { RpkmAddDgComponent } from './rpkm-add-dg/rpkm-add-dg.component';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-reading-period-kind',
  templateUrl: './reading-period-kind.component.html',
  styleUrls: ['./reading-period-kind.component.scss']
})
export class ReadingPeriodKindComponent extends FactoryONE {
  clonedProducts: { [s: string]: IReadingPeriodKind; } = {};

  constructor(
    private dialog: MatDialog,
    public closeTabService: CloseTabService,
    public readManagerService: ReadManagerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(RpkmAddDgComponent, {
        disableClose: true,
        minWidth: '65vw',
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }
  callAPI = async () => {
    this.closeTabService.saveDataForReadingPeriodKindManager = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.readingPeriodKindAll);
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForReadingPeriodKindManager)) {
      this.callAPI();
    }
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForReadingPeriodKindManager = this.closeTabService.saveDataForReadingPeriodKindManager.slice(0, index).concat(this.closeTabService.saveDataForReadingPeriodKindManager.slice(index + 1));
  removeRow = async (rowData: object) => {
    const a = await this.readManagerService.firstConfirmDialog('عنوان: ' + rowData['dataSource'].title + '،  روز ها: ' + rowData['dataSource'].days);
    if (a) {
      await this.readManagerService.deleteSingleRow(ENInterfaces.readingPeriodKindRemove, rowData['dataSource'].id);
      this.refetchTable(rowData['ri']);
    }
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.readManagerService.verification(dataSource['dataSource'])) {
      this.closeTabService.saveDataForReadingPeriodKindManager['ri'] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.readingPeriodKindEdit, dataSource['dataSource']);
  }

}