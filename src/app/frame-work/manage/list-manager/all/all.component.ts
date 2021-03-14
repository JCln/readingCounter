import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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
  getQotrDictionary = (): any => {
    return new Promise((resolve) => {
      resolve(this.listManagerService.getQotrDictionary());
    });
  }
  convertCounterStateIdToTitle = (dataSource: any[], CounterStateDictionary: IDictionaryManager[]) => {
    CounterStateDictionary.map(CounterStateDic => {
      dataSource.map(dataSource => {
        if (dataSource.preCounterStateCode == CounterStateDic.id) {
          dataSource.preCounterStateCode = CounterStateDic.title;
        }
      })
    });
  }
  getCounterStateDictionary = (): any => {
    return new Promise((resolve) => {
      resolve(this.listManagerService.getCounterStateDictionary());
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
  getZoneDictionary = (): any => {
    return new Promise((resolve) => {
      resolve(this.listManagerService.getLMAllZoneDictionary());
    });
  }
  getKarbariDictionary = (): any => {
    return new Promise((resolve) => {
      resolve(this.listManagerService.getKarbariDictionary());
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
    this.zoneDictionary = await this.getZoneDictionary();
    this.karbariDictionary = await this.getKarbariDictionary();
    this.qotrDictionary = await this.getQotrDictionary();
    this.counterStateDictionary = await this.getCounterStateDictionary();

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
  getRouteParams = () => {
    this.subscription.push(this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.trackId = this.route.snapshot.paramMap.get('trackingId');
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
  downloadOutputDBF = (row: IListManagerAll) => {
    this.router.navigate(['wr/m/track/woui', row.id]);

    // if (!this.outputManagerService.checkVertification(row))
    //   return;
    // this.trackingManagerService.downloadOutputDBF(row).subscribe((res: Blob) => {
    //   this.outputManagerService.downloadFile(res);
    //   console.log(res);

    // })

  }
}