import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ITracking } from 'interfaces/imanage';
import { CloseTabService } from 'services/close-tab.service';
import { EnvService } from 'services/env.service';
import { InteractionService } from 'services/interaction.service';
import { OutputManagerService } from 'services/output-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { ConfirmTextDialogComponent } from '../confirm-text-dialog/confirm-text-dialog.component';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss']
})
export class FinishedComponent extends FactoryONE {
  dataSource: ITracking[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    public interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService,
    private dialog: MatDialog,
    public outputManagerService: OutputManagerService,
    private envService: EnvService
  ) {
    super(interactionService);
  }

  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  private rowToOffloaded = async (row: string, desc: string, rowIndex: number) => {
    await this.trackingManagerService.migrateOrRemoveTask(ENInterfaces.trackingToOFFLOADED, row, desc);
    this.refetchTable(rowIndex);
  }
  nullSavedSource = () => this.closeTabService.saveDataForTrackFinished = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForTrackFinished) {
      this.dataSource = this.closeTabService.saveDataForTrackFinished;
    }
    else {
      this.dataSource = await this.trackingManagerService.getDataSource(ENInterfaces.trackingFINISHED);
      this.closeTabService.saveDataForTrackFinished = this.dataSource;
    }
    if (this.dataSource.length)
      this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.trackingManagerService.columnSelectedMenuDefault();
    this._selectedColumns = this.trackingManagerService.customizeSelectedColumns(this._selectCols);
  }
  backToImportedConfirmDialog = (rowDataAndIndex: object) => {
    const title = EN_messages.reason_toOffloaded;
    return new Promise(() => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: '19rem',
        data: {
          title: title,
          isInput: true,
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          this.rowToOffloaded(rowDataAndIndex['dataSource'], desc, rowDataAndIndex['ri']);
        }
      })
    })
  }
  reDownloadOutputSingle = async (row: ITracking) => {
    if (this.envService.hasNextBazdid) {
      this.hasNextBazdid(row);
      return;
    }
    const a = await this.trackingManagerService.downloadOutputWithoutDESC(ENInterfaces.OutputDELAYED, row);
    this.outputManagerService.downloadFile(a);
  }
  hasNextBazdid = async (row: ITracking) => {
    let hasbazdid = await this.trackingManagerService.hasNextBazdidConfirmDialog(EN_messages.insert_nextBazdidDate);
    hasbazdid = Converter.persianToEngNumbers(hasbazdid);
    if (hasbazdid) {
      this.outputManagerService.downloadFile(await this.trackingManagerService.downloadOutputSingleWithENV(ENInterfaces.OutputDELAYED, row, hasbazdid));
    }
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }

}