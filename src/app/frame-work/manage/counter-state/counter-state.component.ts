import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IDictionaryManager } from 'src/app/Interfaces/IDictionaryManager';
import { IUserManager } from 'src/app/Interfaces/iuser-manager';
import { CloseTabService } from 'src/app/services/close-tab.service';

import { InteractionService } from './../../../services/interaction.service';
import { InterfaceManagerService } from './../../../services/interface-manager.service';


const gridFriendly = {
  take: 20,
  skip: 0,
  sort: [],
  filter: {},
  group: [],
  aggregate: []
}
@Component({
  selector: 'app-counter-state',
  templateUrl: './counter-state.component.html',
  styleUrls: ['./counter-state.component.scss']
})
export class CounterStateComponent implements OnInit, AfterViewInit, OnDestroy {
  gridFriendlyData = gridFriendly;
  zoneDictionary: IDictionaryManager[] = [];
  subscription: Subscription[] = [];

  dataSource: IUserManager;
  dataSourceSlice: any; // grid friendly data for lazyloading

  _selectCols: any[];
  _selectedColumns: any[];

  innerLoading: boolean = false;

  constructor(
    private interactionService: InteractionService,
    private interfaceManagerService: InterfaceManagerService,
    private closeTabService: CloseTabService
  ) {
  }
  loadCustomers(event: LazyLoadEvent) {
    console.log(event);
    console.log(event.sortField);


    // this.innerLoading = true;
    // this.interfaceManagerService.postCounterStatGridFriendly(event).subscribe(res => {
    //   if (res)
    //     console.log(res);

    //   this.dataSourceSlice = res;
    //   this.innerLoading = false;
    // })

  }
  columnSelectedMenuDefault = () => {
    this._selectCols = [
      { field: 'moshtarakinId', header: 'مشترکین' },
      { field: 'title', header: 'عنوان' },
      { field: 'zoneId', header: 'ناحیه' },
      { field: 'clientOrder', header: 'ترتیب' },
      { field: 'canEnterNumber', header: 'ثبت رقم' },
      { field: 'isMane', header: 'مانع' },
      { field: 'canNumberBeLessThanPre', header: 'رقم فعلی کمتر از قبلی' },
      { field: 'isTavizi', header: 'تعویضی' },
      { field: 'shouldEnterNumber', header: 'اجبار رقم' },
      { field: 'isXarab', header: 'خراب' },
      { field: 'isFaqed', header: 'فاقد' }
    ];
    this._selectedColumns = this._selectCols;
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    this._selectedColumns = this.dataSourceSlice.filter(col => val.includes(col));
  }
  // getGridFriendlyDataSource = (event: LazyLoadEvent): any => {
  //   let counterStateReq: ICounterStateGridFriendlyReq = {
  //     take: event.rows,
  //     skip: event.first,
  //     sort: event
  //   }
  // }
  getGridFriendlyDataSourceDefault = (): any => {
    return new Promise(resolve => {
      this.interfaceManagerService.postCounterStatGridFriendly(this.gridFriendlyData).subscribe(res => {
        resolve(res);
      })
    });
  }
  convertIdToTitle = (dataSource: any, zoneDictionary: IDictionaryManager[]) => {
    dataSource.map(dataSource => {
      zoneDictionary.map(zoneDic => {
        if (zoneDic.id === dataSource.zoneId)
          dataSource.zoneId = zoneDic.title;
      })
    });
  }
  getZoneDictionary = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getZoneDictionaryManager().subscribe(res => {
        if (res)
          resolve(res);
      })
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForCounterState = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForCounterState) {
      this.dataSourceSlice.data = this.closeTabService.saveDataForCounterState;
      this.zoneDictionary = this.closeTabService.saveDictionaryForCounterState;
    }
    else {
      this.dataSourceSlice = await this.getGridFriendlyDataSourceDefault();
      this.dataSourceSlice = this.dataSourceSlice.data;
      console.log(this.dataSourceSlice);

      this.zoneDictionary = await this.getZoneDictionary();
      this.closeTabService.saveDataForCounterState = this.dataSourceSlice;
      this.closeTabService.saveDictionaryForCounterState = this.zoneDictionary;
    }
    this.convertIdToTitle(this.dataSourceSlice, this.zoneDictionary);
  }
  ngOnInit(): void {
    this.classWrapper();
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
    this.columnSelectedMenuDefault();
  }
  ngOnDestroy(): void {
    this.subscription.forEach(subscription => subscription.unsubscribe())
  }

}