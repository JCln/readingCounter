import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';
import { ICounterState, ICounterStateGridFriendlyResp } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { CounterStateService } from 'src/app/services/counter-state.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-counter-state',
  templateUrl: './counter-state.component.html',
  styleUrls: ['./counter-state.component.scss']
})
export class CounterStateComponent implements OnInit, AfterViewInit, OnDestroy {
  gridFriendlyData: any;
  zoneDictionary: IDictionaryManager[] = [];
  subscription: Subscription[] = [];

  dataSourceRES: ICounterStateGridFriendlyResp; // grid friendly data for lazyloading
  dataSource: ICounterState[] = [];

  _selectCols: any[];
  _selectedColumns: any[];

  innerLoading: boolean = false;

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private counterStateService: CounterStateService
  ) {
  }
  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  columnSelectedMenuDefault = () => {
    this._selectCols = this.counterStateService.columnSelectedMenuDefault();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  sendGridFriendlyDataSource = (event: LazyLoadEvent): any => {
    this.counterStateService.getGridFriendlyDataSource(event);
  }
  convertIdToTitle = (dataSource: any, zoneDictionary: IDictionaryManager[]) => {
    dataSource.map(dataSource => {
      zoneDictionary.map(zoneDic => {
        if (zoneDic.id === dataSource.zoneId)
          dataSource.zoneId = zoneDic.title;
      })
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForCounterState = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForCounterState) {
      this.dataSourceRES = this.closeTabService.saveDataForCounterState;
    }
    else {
      this.dataSourceRES = await this.counterStateService.getGridFriendlyDataSourceDefault();
      this.closeTabService.saveDataForCounterState = this.dataSourceRES;
    }
    this.zoneDictionary = await this.counterStateService.getZoneDictionary();
    this.dataSource = this.dataSourceRES.data;
    this.convertIdToTitle(this.dataSource, this.zoneDictionary);
  }
  ngOnInit(): void {
    this.classWrapper();
    this.columnSelectedMenuDefault();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/cs')
          this.classWrapper(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    this.subscription.forEach(subscription => subscription.unsubscribe())
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}