import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { IReadingPeriodKind } from 'src/app/Interfaces/imanage';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ReadManagerService } from 'src/app/services/read-manager.service';

import { RpkmAddDgComponent } from './rpkm-add-dg/rpkm-add-dg.component';

@Component({
  selector: 'app-reading-period-kind',
  templateUrl: './reading-period-kind.component.html',
  styleUrls: ['./reading-period-kind.component.scss']
})
export class ReadingPeriodKindComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: IReadingPeriodKind[] = [];
  subscription: Subscription[] = [];

  clonedProducts: { [s: string]: IReadingPeriodKind; } = {};

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private dialog: MatDialog,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private readManagerService: ReadManagerService
  ) { }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(RpkmAddDgComponent, {
        disableClose: true,
        minWidth: '30rem'
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          await this.readManagerService.addOrEditAuths(ENInterfaces.readingPeriodKindAdd, result);
        }
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForReadingPeriodKindManager = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForReadingPeriodKindManager) {
      this.dataSource = this.closeTabService.saveDataForReadingPeriodKindManager;
    }
    else {
      this.dataSource = await this.readManagerService.getDataSource(ENInterfaces.readingPeriodKindAll);
      this.closeTabService.saveDataForReadingPeriodKindManager = this.dataSource;
    }
    this.insertSelectedColumns();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/r/rpk')
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
  insertSelectedColumns = () => {
    this._selectCols = this.readManagerService.columnReadingPeriodKind();
    this._selectedColumns = this.readManagerService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: IReadingPeriodKind, rowIndex: number) => {
    const a = await this.readManagerService.firstConfirmDialog();
    if (a) {
      await this.readManagerService.deleteSingleRow(ENInterfaces.readingPeriodKindRemove, rowData.id);
      this.refetchTable(rowIndex);
    }
  }
  onRowEditInit(dataSource: any) {
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditSave = async (dataSource: IReadingPeriodKind, rowIndex: number) => {
    if (!this.readManagerService.verification(dataSource)) {
      this.dataSource[rowIndex] = this.clonedProducts[dataSource.id];
      return;
    }
    await this.readManagerService.addOrEditAuths(ENInterfaces.readingPeriodKindEdit, dataSource);
  }
  refreshTable = () => {
    this.classWrapper(true);
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}