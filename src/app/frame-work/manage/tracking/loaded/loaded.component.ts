import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { EN_messages } from 'src/app/Interfaces/enums.enum';
import { ITracking } from 'src/app/Interfaces/imanage';
import { ENSnackBarColors, ENSnackBarTimes, IDictionaryManager, IResponses } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';
import { TrackingManagerService } from 'src/app/services/tracking-manager.service';

import { ConfirmTextDialogComponent } from '../confirm-text-dialog/confirm-text-dialog.component';

@Component({
  selector: 'app-loaded',
  templateUrl: './loaded.component.html',
  styleUrls: ['./loaded.component.scss']
})
export class LoadedComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  dataSource: ITracking[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];
  selectedFuckingTest: any[] = [];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private trackingManagerService: TrackingManagerService,
    private dialog: MatDialog,
    private snackWrapperService: SnackWrapperService,
    public outputManagerService: OutputManagerService
  ) {
  }

  nullSavedSource = () => this.closeTabService.saveDataForTrackLoaded = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForTrackLoaded) {
      this.dataSource = this.closeTabService.saveDataForTrackLoaded;
    }
    else {
      this.dataSource = await this.trackingManagerService.getLoadedDataSource();
      this.closeTabService.saveDataForTrackLoaded = this.dataSource;
    }
    this.zoneDictionary = await this.trackingManagerService.getZoneDictionary();

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
        if (res === '/wr/m/track/loaded')
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
  private rowToImported = (row: ITracking, desc: string, rowIndex: number) => {
    this.trackingManagerService.migrateDataRowToImported(row.id, desc).subscribe((res: IResponses) => {
      if (res) {
        this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.fourMili, ENSnackBarColors.success);
        // this.refreshTable();
        this.refetchTable(rowIndex)
      }
    });
  }
  private removeRow = (rowData: ITracking, desc: string, rowIndex: number) => {
    this.trackingManagerService.removeTrackingId(rowData.id, desc).subscribe((res: IResponses) => {
      if (res) {
        this.snackWrapperService.openSnackBar(res.message, ENSnackBarTimes.fourMili, ENSnackBarColors.success);
        this.refetchTable(rowIndex);
      }
    })
  }
  firstConfirmDialog = (rowData: ITracking, rowIndex: number) => {
    const title = EN_messages.reason_deleteRoute;
    return new Promise(() => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        data: {
          title: title,
          isInput: true,
          isDelete: true
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          this.removeRow(rowData, desc, rowIndex)
        }
      })
    })
  }
  backToImportedConfirmDialog = (rowData: ITracking, rowIndex: number) => {
    const title = EN_messages.reson_delete_backtoImported;
    return new Promise(() => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        data: {
          title: title,
          isInput: true
        }
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
  trackColumnChanges = ($event: any) => this.trackingManagerService.setColumnsChanges('menuDefault', $event);

}