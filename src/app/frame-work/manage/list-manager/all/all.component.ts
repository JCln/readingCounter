import { Location } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { Subscription } from 'rxjs/internal/Subscription';
import { IOnOffLoadFlat } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ListManagerService } from 'src/app/services/list-manager.service';
import { OutputManagerService } from 'src/app/services/output-manager.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit, AfterViewInit, OnDestroy {
  trackId: string;
  isModify: string | boolean;
  subscription: Subscription[] = [];

  dataSource: IOnOffLoadFlat[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  karbariDictionary: IDictionaryManager[] = [];
  qotrDictionary: IDictionaryManager[] = [];
  counterStateDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private listManagerService: ListManagerService,
    public outputManagerService: OutputManagerService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
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
          dataSource.preCounterStateCode = CounterStateDic.title;
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
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.listManagerService.nullSavedAllLMSource();
    }

    this.dataSource = await this.listManagerService.getLMAll(this.trackId);

    this.zoneDictionary = await this.listManagerService.getLMAllZoneDictionary();
    this.karbariDictionary = await this.listManagerService.getKarbariDictionary();
    this.qotrDictionary = await this.listManagerService.getQotrDictionary();
    this.counterStateDictionary = await this.listManagerService.getCounterStateDictionary();

    this.convertIdToTitle(this.dataSource, this.zoneDictionary);
    this.convertKarbariIdToTitle(this.dataSource, this.karbariDictionary);
    this.convertQotrIdToTitle(this.dataSource, this.qotrDictionary);
    this.convertCounterStateIdToTitle(this.dataSource, this.counterStateDictionary);

    if (this.dataSource.length)
      this.insertSelectedColumns();
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
  }
  getRouteParams = () => {
    this.subscription.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.isFromOffloadPage();
      this.classWrapper();
    })
    )
  }
  ngOnInit(): void {
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res.includes('/wr/m/l/all/'))
          this.classWrapper();
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
  routeToWoui = (object: IOnOffLoadFlat) => {
    this.router.navigate(['wr/m/track/woui', false, object.id]);
  }
  routeToOffload = (object: IOnOffLoadFlat) => {
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
  refreshTable = () => {
    this.classWrapper(true);
  }
  toPrePage = () => this._location.back();
}