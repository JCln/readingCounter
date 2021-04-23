import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ITracking } from 'src/app/Interfaces/imanage';
import { IResponses } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { OutputManagerService } from 'src/app/services/output-manager.service';
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
    private dialog: MatDialog,
    public outputManagerService: OutputManagerService,
    private router: Router
  ) { }

  routeToLMPayDay = (row: ITracking) => {
    this.utilsService.routeToByParams('wr/m/l/pd', row.trackNumber);
  }
  routeToLMAll = (row: ITracking) => {
    this.router.navigate(['wr/m/l/all', false, row.id]);
  }
  private rowToImported = (row: ITracking, desc: string, rowIndex: number) => {
    this.trackingManagerService.migrateDataRowToImported(row.id, desc).subscribe((res: IResponses) => {
      if (res) {
        this.utilsService.snackBarMessageSuccess(res.message);
        this.refetchTable(rowIndex);
      }
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
      this.dataSource = await this.trackingManagerService.getReadingDataSource();
      this.closeTabService.saveDataForTrackReading = this.dataSource;
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
    this._selectedColumns = this.customizeSelectedColumns();
  }
  ngOnInit(): void {
    this.classWrapper();
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
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  backToImportedConfirmDialog = (rowData: ITracking, rowIndex: number) => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        data: 'علت بازگشت به صادر شده'
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          this.rowToImported(rowData, desc, rowIndex);
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