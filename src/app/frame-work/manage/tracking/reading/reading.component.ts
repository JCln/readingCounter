import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ITracking } from 'interfaces/itrackings';
import { BrowserStorageService } from 'services/browser-storage.service';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { UtilsService } from 'services/utils.service';
import { FactoryONE } from 'src/app/classes/factory';
import { EN_Routes } from 'src/app/Interfaces/routes.enum';

import { ConfirmTextDialogComponent } from '../confirm-text-dialog/confirm-text-dialog.component';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss']
})
export class ReadingComponent extends FactoryONE {

  dataSource: ITracking[] = [];

  constructor(
    private closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
    public interactionService: InteractionService,
    public browserStorageService: BrowserStorageService
  ) {
    super();
  }

  routeToLMPayDay = (row: ITracking) => {
    this.utilsService.routeToByParams(EN_Routes.wrmlpd, row.trackNumber);
  }
  private rowToImported = async (row: string, desc: string, rowIndex: number) => {
    await this.trackingManagerService.migrateOrRemoveTask(ENInterfaces.trackingToIMPORTED, row, desc);
  }
  nullSavedSource = () => this.closeTabService.saveDataForTrackReading = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForTrackReading) {
      this.dataSource = this.closeTabService.saveDataForTrackReading;
    }
    else {
      this.dataSource = await this.trackingManagerService.getDataSource(ENInterfaces.trackingREADING);
      this.closeTabService.saveDataForTrackReading = this.dataSource;
    }
  }
  // refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  backToImportedConfirmDialog = (rowDataAndIndex: object) => {
    const title = EN_messages.reson_delete_backtoImported;
    return new Promise(() => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: '19rem',
        data: {
          title: title,
          isInput: true
        }
      })
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          this.rowToImported(rowDataAndIndex['dataSource'], desc, rowDataAndIndex['ri']);
        }
      })
    })
  }
  forceOffload = (rowDataAndIndex: object) => {
    const title = EN_messages.reason_forceOffload;
    return new Promise(() => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: '19rem',
        data: {
          title: title,
          isInput: true,
          isDelete: true
        }
      });
      dialogRef.afterClosed().subscribe(async desc => {
        if (desc) {
          await this.trackingManagerService.migrateOrRemoveTask(ENInterfaces.trackingFinishReadiED, rowDataAndIndex['dataSource'], desc);
          this.refreshTable();
        }
      })
    })
  }

}