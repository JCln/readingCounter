import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { ICounterReport } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ReadManagerService } from 'src/app/services/read-manager.service';

import { CrAddDgComponent } from './cr-add-dg/cr-add-dg.component';

@Component({
  selector: 'app-counter-report',
  templateUrl: './counter-report.component.html',
  styleUrls: ['./counter-report.component.scss']
})
export class CounterReportComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource: ICounterReport[] = [];
  subscription: Subscription[] = [];

  zoneDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: ICounterReport; } = {};

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
      const dialogRef = this.dialog.open(CrAddDgComponent, {
        disableClose: true,
        minWidth: '30rem',
        data: {
          di: this.zoneDictionary
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          await this.readManagerService.addOrEditAuths(ENInterfaces.CounterReportAdd, result);
        }
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForCounterReport = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForCounterReport) {
      this.dataSource = this.closeTabService.saveDataForCounterReport;
    }
    else {
      this.dataSource = await this.readManagerService.getDataSource(ENInterfaces.CounterReportAll);
      this.closeTabService.saveDataForCounterReport = this.dataSource;
    }
    this.zoneDictionary = await this.readManagerService.getZoneDictionary();

    this.readManagerService.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    this.insertSelectedColumns();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/r/cr')
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
    this._selectCols = this.readManagerService.columnCounterReport();
    this._selectedColumns = this.readManagerService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: ICounterReport, rowIndex: number) => {
    const a = await this.readManagerService.firstConfirmDialog();
    if (a) {
      await this.readManagerService.deleteSingleRow(ENInterfaces.CounterReportRemove, rowData.id);
      this.refetchTable(rowIndex);
    }
  }
  onRowEditInit(dataSource: any) {
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditSave = async (dataSource: ICounterReport, rowIndex: number) => {
    if (!this.readManagerService.verification(dataSource)) {
      this.dataSource[rowIndex] = this.clonedProducts[dataSource.id];
      return;
    }
    if (typeof dataSource.zoneId !== 'object') {
      this.zoneDictionary.find(item => {
        if (item.title === dataSource.zoneId)
          dataSource.zoneId = item.id
      })
    } else {
      dataSource.zoneId = dataSource.zoneId['id'];
    }
    await this.readManagerService.addOrEditAuths(ENInterfaces.CounterReportEdit, dataSource);
    this.readManagerService.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
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