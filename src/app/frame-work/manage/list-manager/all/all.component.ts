import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IListManagerAll } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ListManagerService } from 'src/app/services/list-manager.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit, AfterViewInit, OnDestroy {
  trackId: string;
  isModify: string | boolean;
  subscription: Subscription[] = [];

  dataSource: IListManagerAll[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private route: ActivatedRoute,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private listManagerService: ListManagerService,
    private router: Router
  ) {
    this.getRouteParams();
  }

  convertQotrIdToTitle = (dataSource: any[], qotrDictionary: IDictionaryManager[]) => {
    qotrDictionary.map(qotrDic => {
      dataSource.map(dataSource => {
        if (dataSource.qotrCode == qotrDic.id) {
          dataSource.qotrCode = qotrDic.title;
        }
      })
    });
  }
  convertCounterStateIdToTitle = (dataSource: any[], CounterStateDictionary: IDictionaryManager[]) => {
    CounterStateDictionary.map(CounterStateDic => {
      dataSource.map(dataSource => {
        if (dataSource.counterStateCode == CounterStateDic.id) {
          dataSource.counterStateCode = CounterStateDic.title;
        }
      })
    });
  }
  convertIdToTitle = (dataSource: any[], zoneDictionary: IDictionaryManager[]) => {
    zoneDictionary.map(zoneDic => {
      dataSource.map(dataSource => {
        if (dataSource.zoneId == zoneDic.id) {
          dataSource.zoneId = zoneDic.title;
        }
      })
    });
  }
  convertKarbariIdToTitle = (dataSource: any[], karbariDictionary: IDictionaryManager[]) => {
    karbariDictionary.map(karbariDic => {
      dataSource.map(dataSource => {
        if (dataSource.karbariCode == karbariDic.id) {
          dataSource.karbariCode = karbariDic.title;
        }
      })
    });
  }
  getDataSource = (): Promise<IListManagerAll[]> => {
    return new Promise((resolve) => {
      this.listManagerService.getLMAll(this.trackId).subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  nullSavedSource = () => this.closeTabService.saveDataForLMAll = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.dataSource = await this.getDataSource();
    this.zoneDictionary = await this.listManagerService.getLMAllZoneDictionary();
    this.karbariDictionary = await this.listManagerService.getKarbariDictionary();
    this.qotrDictionary = await this.listManagerService.getQotrDictionary();
    this.counterStateDictionary = await this.listManagerService.getCounterStateDictionary();

    this.convertIdToTitle(this.dataSource, this.zoneDictionary);
    this.convertKarbariIdToTitle(this.dataSource, this.karbariDictionary);
    this.convertQotrIdToTitle(this.dataSource, this.qotrDictionary);
    this.convertCounterStateIdToTitle(this.dataSource, this.counterStateDictionary);
  }
  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  insertSelectedColumns = () => {
    this._selectCols = this.listManagerService.columnSelectedLMAll();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  isFromOffloadPage = () => {
    this.trackId = this.route.snapshot.paramMap.get('trackingId');
    this.isModify = this.route.snapshot.paramMap.get('isModify');
    this.isModify = this.isModify.toLocaleLowerCase() === 'true' ? true : false;
    console.log(this.isModify);
  }
  getRouteParams = () => {
    this.subscription.push(this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.isFromOffloadPage();
        this.classWrapper();
        this.insertSelectedColumns();
      }
    })
    )
  }
  ngOnInit(): void {
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res.includes('/wr/m/l/all/'))
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
  downloadOutputDBF = (object: IListManagerAll) => {
    this.router.navigate(['wr/m/track/woui', false, object.id]);
  }
  routeToOffload = (object: IListManagerAll) => {
    let zoneId;
    this.zoneDictionary.map(item => {
      if (item.title === object.zoneId)
        zoneId = item.id
    })
    this.router.navigate(['wr/m/track/offloaded/offloadMfy', zoneId + object.id]);
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}