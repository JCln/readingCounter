import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { ITracking } from 'src/app/Interfaces/imanage';
import { IResponses } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { TrackingManagerService } from 'src/app/services/tracking-manager.service';
import { UtilsService } from 'src/app/services/utils.service';

import { ConfirmTextDialogComponent } from '../confirm-text-dialog/confirm-text-dialog.component';


@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss']
})
export class ReadingComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  dataSource: ITracking[] = [];
  _selectCols: any = [];
  _selectedColumns: any[];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private trackingManagerService: TrackingManagerService,
    private utilsService: UtilsService,
    private dialog: MatDialog
  ) { }

  routeToLMPayDay = (row: ITracking) => {
    this.utilsService.routeToByParams('wr/m/l/pd', row.trackNumber);
  }
  routeToLMAll = (row: ITracking) => {
    this.utilsService.routeToByParams('wr/m/l/all', row.id);
  }
  rowToImported = (row: ITracking, desc: string) => {
    this.trackingManagerService.migrateDataRowToImported(row.id, desc).subscribe((res: IResponses) => {
      if (res) {
        this.utilsService.snackBarMessageSuccess(res.message);
        this.refreshTable();
      }
    })
  }
  getDataSource = (): Promise<ITracking[]> => {
    return new Promise((resolve) => {
      this.trackingManagerService.getReadingDataSource().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
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
      this.dataSource = await this.getDataSource();
      console.log(this.dataSource);

      this.closeTabService.saveDataForTrackReading = this.dataSource;
    }
  }
  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  insertSelectedColumns = () => {
    this._selectCols = this.trackingManagerService.columnSelectedMenuDefault();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
    this.insertSelectedColumns();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/track/reading')
          this.classWrapper(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  refreshTable = () => {
    this.classWrapper(true);
  }
  backToImportedConfirmDialog = (rowData: ITracking) => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        data: 'علت بازگشت به صادر شده'
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          this.rowToImported(rowData, desc)
        }
      })
    })
  }
}