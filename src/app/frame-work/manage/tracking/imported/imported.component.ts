import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { ITracking } from 'src/app/Interfaces/imanage';
import { ENSnackBarColors, ENSnackBarTimes, IDictionaryManager, IResponses } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';
import { TrackingManagerService } from 'src/app/services/tracking-manager.service';

import { ConfirmTextDialogComponent } from '../confirm-text-dialog/confirm-text-dialog.component';
import { EN_messages } from './../../../../Interfaces/enums.enum';
import { ImportListDgComponent } from './import-list-dg/import-list-dg.component';


@Component({
  selector: 'app-imported',
  templateUrl: './imported.component.html',
  styleUrls: ['./imported.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class ImportedComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  dataSource: ITracking[] = [];
  filterZoneDictionary: IDictionaryManager[] = [];

  selectedFuckingTest: any[] = []
  _selectCols: any[] = [];
  _selectedColumns: any[];
  _selectedInnerColumns: any[];

  ref: DynamicDialogRef;

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService,
    private dialogService: DialogService,
    private dialog: MatDialog,
    private snackWrapperService: SnackWrapperService,
    public outputManagerService: OutputManagerService
  ) {
  }

  nullSavedSource = () => this.closeTabService.saveDataForTrackImported = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForTrackImported) {
      this.dataSource = this.closeTabService.saveDataForTrackImported;
    }
    else {
      this.dataSource = await this.trackingManagerService.getImportedDataSource();
      this.filterZoneDictionary = await this.trackingManagerService.getZoneDictionary();
      this.closeTabService.saveDataForTrackImported = this.dataSource;
    }

    if (this.dataSource.length)
      this.insertSelectedColumns();
  }
  onRowEditInit(product: any) {
    console.log(product);
  }
  onRowEditSave(rowData: any) {
    this.trackingManagerService.postEditingTrack(rowData);
    this.refreshTable();
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
        if (res === '/wr/m/track/imported')
          this.classWrapper(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  refreshTable = () => {
    this.classWrapper(true);
  }
  showMoreDetails = (data: ITracking) => {
    this.ref = this.dialogService.open(ImportListDgComponent, {
      data: data,
      rtl: true,
      width: '70%'
    })
    this.ref.onClose.subscribe((res: ITracking) => {
      if (res)
        this.onRowEditSave(res);
    });
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = (rowData: ITracking, desc: string, rowIndex: number) => {
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
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}