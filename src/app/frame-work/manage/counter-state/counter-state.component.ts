import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IDictionaryManager } from 'src/app/Interfaces/IDictionaryManager';
import { IUserManager } from 'src/app/Interfaces/iuser-manager';
import { CloseTabService } from 'src/app/services/close-tab.service';

import { ICounterStateGridFriendly } from './../../../Interfaces/imanage';
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
  dataSourceSlice: ICounterStateGridFriendly; // grid friendly data for lazyloading

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
  postGridFriendlyDataSource = (): any => {
    return new Promise(resolve => {
      this.interfaceManagerService.postCounterStatGridFriendly(this.gridFriendlyData).subscribe(res => {
        resolve(res);
      })
    });
  }
  getDataSource = (): Promise<IUserManager> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getCounterState().subscribe((res: any) => {
        if (res) {
          resolve(res);
        }
      })
    })
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
      this.dataSource = this.closeTabService.saveDataForCounterState;
      this.zoneDictionary = this.closeTabService.saveDictionaryForCounterState;
    }
    else {
      console.log(this.gridFriendlyData);
      
      // this.dataSource = await this.getDataSource();
      this.dataSourceSlice = await this.postGridFriendlyDataSource();
      console.log(this.dataSourceSlice);

      this.zoneDictionary = await this.getZoneDictionary();
      this.closeTabService.saveDataForCounterState = this.dataSource;
      this.closeTabService.saveDictionaryForCounterState = this.zoneDictionary;
    }
    this.convertIdToTitle(this.dataSource, this.zoneDictionary);
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
  }
  ngOnDestroy(): void {
    this.subscription.forEach(subscription => subscription.unsubscribe())
  }

}