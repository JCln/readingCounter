import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ITracking } from 'src/app/Interfaces/imanage';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';

import { TrackingManagerService } from './../../../../services/tracking-manager.service';

@Component({
  selector: 'app-imported',
  templateUrl: './imported.component.html',
  styleUrls: ['./imported.component.scss']
})
export class ImportedComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  dataSource: ITracking[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];

  _firstPage: number = 0;
  _rowsNumberPage: number = 10;

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private trackingManagerService: TrackingManagerService
  ) {
  }

  getDataSource = (): Promise<ITracking[]> => {
    return new Promise((resolve) => {
      this.trackingManagerService.getImportedDataSource().subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
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
      this.dataSource = await this.getDataSource();
      console.log(this.dataSource);

      this.closeTabService.saveDataForTrackImported = this.dataSource;
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
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

}