import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ITracking } from 'src/app/Interfaces/imanage';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { TrackingManagerService } from 'src/app/services/tracking-manager.service';
import { UtilsService } from 'src/app/services/utils.service';


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

  _firstPage: number = 0;
  _rowsNumberPage: number = 10;

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private trackingManagerService: TrackingManagerService,
    private utilsService: UtilsService
  ) {
  }

  routeToLMPayDay = (row: ITracking) => {
    this.utilsService.routeToByParams('wr/m/l/pd', row.trackNumber);
  }
  routeToLMAll = (row: ITracking) => {
    this.utilsService.routeToByParams('wr/m/l/all', row.id);
  }
  rowToImported = (row: ITracking) => this.trackingManagerService.migrateDataRowToImported(row.id);
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
  next = () => this._firstPage = this._firstPage + this._rowsNumberPage;
  prev = () => this._firstPage = this._firstPage - this._rowsNumberPage;
  reset = () => this._firstPage = 0;
  isLastPage = (): boolean => { return this.dataSource ? this._firstPage === (this.dataSource.length - this._rowsNumberPage) : true; }
  isFirstPage = (): boolean => { return this.dataSource ? this._firstPage === 0 : true; }
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

}