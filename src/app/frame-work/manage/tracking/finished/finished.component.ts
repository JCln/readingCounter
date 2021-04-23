import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { ITracking } from 'src/app/Interfaces/imanage';
import { ENSnackBarColors, ENSnackBarTimes, IResponses } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';
import { TrackingManagerService } from 'src/app/services/tracking-manager.service';

import { ConfirmTextDialogComponent } from '../confirm-text-dialog/confirm-text-dialog.component';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss']
})
export class FinishedComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  dataSource: ITracking[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private trackingManagerService: TrackingManagerService,
    private dialog: MatDialog,
    private snackWrapperService: SnackWrapperService,
    public outputManagerService: OutputManagerService
  ) {
  }

  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  private rowToOffloaded = (row: ITracking, desc: string, rowIndex: number) => {
    this.trackingManagerService.migrateDataRowToOffloaded(row.id, desc).subscribe((res: IResponses) => {
      if (res) {
        this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.fourMili, ENSnackBarColors.success);
        this.refetchTable(rowIndex);
      }
    });
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
      this.dataSource = await this.trackingManagerService.getFinishedDataSource();
      this.closeTabService.saveDataForTrackFinished = this.dataSource;
    }
    if (this.dataSource.length)
      this.insertSelectedColumns();
  }
  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  insertSelectedColumns = () => {
    this._selectCols = this.trackingManagerService.columnSelectedMenuDefault();
    console.log(this.customizeSelectedColumns());


    this._selectedColumns = this.customizeSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  downloadDbfOutput = (row: ITracking) => {
    this.trackingManagerService.downloadOutputDBF(row).subscribe(res => {
      console.log(res);
    })
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/track/finished')
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
  backToImportedConfirmDialog = (rowData: ITracking, rowIndex: number) => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        data: 'علت بازگشت به صادر شده'
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          this.rowToOffloaded(rowData, desc, rowIndex);
        }
      })
    })
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }

}