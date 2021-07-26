import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ICounterState, ICounterStateGridFriendlyResp } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { CounterStateService } from 'services/counter-state.service';
import { InteractionService } from 'services/interaction.service';
import { ReadManagerService } from 'services/read-manager.service';
import { Converter } from 'src/app/classes/converter';

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
    private counterStateService: CounterStateService,
    private readManagerService: ReadManagerService
  ) {
  }

  columnSelectedMenuDefault = () => {
    this._selectCols = this.counterStateService.columnSelectedMenuDefault();
    this._selectedColumns = this.readManagerService.customizeSelectedColumns(this._selectCols);
  }
  sendGridFriendlyDataSource = (event: LazyLoadEvent): any => {
    this.dataSource = this.counterStateService.getGridFriendlyDataSource(event);
  }
  nullSavedSource = () => this.closeTabService.saveDataForCounterState = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForCounterState) {
      this.dataSource = this.closeTabService.saveDataForCounterState;
    }
    else {
      this.dataSource = await this.counterStateService.getGridFriendlyDataSourceDefault();
      this.closeTabService.saveDataForCounterState = this.dataSource;
    }
    this.zoneDictionary = await this.counterStateService.getZoneDictionary();
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
  }
  ngOnInit(): void {
    this.classWrapper();
    this.columnSelectedMenuDefault();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/r/cs')
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
  refreshTable = () => {
    this.classWrapper(true);
  }

}