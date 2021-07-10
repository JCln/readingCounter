import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IReadingPeriod } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { ReadManagerService } from 'services/read-manager.service';

import { RpmAddDgComponent } from './rpm-add-dg/rpm-add-dg.component';

@Component({
  selector: 'app-reading-period',
  templateUrl: './reading-period.component.html',
  styleUrls: ['./reading-period.component.scss']
})
export class ReadingPeriodComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource: IReadingPeriod[] = [];
  subscription: Subscription[] = [];

  zoneDictionary: IDictionaryManager[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IReadingPeriod; } = {};

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private dialog: MatDialog,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public readManagerService: ReadManagerService
  ) { }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(RpmAddDgComponent, {
        disableClose: true,
        minWidth: '19rem',
        data: {
          di: this.zoneDictionary,
          rpkmId: this.readingPeriodKindDictionary
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          await this.readManagerService.addOrEditAuths(ENInterfaces.readingPeriodAdd, result);
        }
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForReadingPeriodManager = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForReadingPeriodManager) {
      this.dataSource = this.closeTabService.saveDataForReadingPeriodManager;
    }
    else {
      this.dataSource = await this.readManagerService.getDataSource(ENInterfaces.readingPeriodAll);
      this.closeTabService.saveDataForReadingPeriodManager = this.dataSource;
    }
    this.zoneDictionary = await this.readManagerService.getZoneDictionary();
    this.readingPeriodKindDictionary = await this.readManagerService.getReadingPeriodKindDictionary();

    this.readManagerService.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    this.readManagerService.convertIdToTitle(this.dataSource, this.readingPeriodKindDictionary, 'readingPeriodKindId');
    this.insertSelectedColumns();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/r/rp')
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
    this._selectCols = this.readManagerService.columnReadingPeriod();
    this._selectedColumns = this.readManagerService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: IReadingPeriod, rowIndex: number) => {
    const a = await this.readManagerService.firstConfirmDialog();
    if (a) {
      await this.readManagerService.deleteSingleRow(ENInterfaces.readingPeriodRemove, rowData.id);
      this.refetchTable(rowIndex);
    }
  }
  onRowEditInit(dataSource: any) {
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditSave = async (dataSource: IReadingPeriod, rowIndex: number) => {
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
    if (typeof dataSource.readingPeriodKindId !== 'object') {
      this.readingPeriodKindDictionary.find(item => {
        if (item.title === dataSource.readingPeriodKindId)
          dataSource.readingPeriodKindId = item.id
      })
    } else {
      dataSource.readingPeriodKindId = dataSource.readingPeriodKindId['id'];
    }
    await this.readManagerService.addOrEditAuths(ENInterfaces.readingPeriodEdit, dataSource);
    this.readManagerService.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    this.readManagerService.convertIdToTitle(this.dataSource, this.readingPeriodKindDictionary, 'readingPeriodKindId');
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