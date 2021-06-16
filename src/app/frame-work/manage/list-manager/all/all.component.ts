import { Location } from '@angular/common';
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { Subscription } from 'rxjs/internal/Subscription';
import { IOnOffLoadFlat } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
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
  counterStateByCodeDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private interactionService: InteractionService,
    public listManagerService: ListManagerService,
    public outputManagerService: OutputManagerService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {
    this.getRouteParams();
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
    const tempZone: number = parseInt(this.dataSource[0].zoneId.toString());
    if (tempZone)
      this.counterStateByCodeDictionary = await this.listManagerService.getCounterStateByCodeDictionary(tempZone);


    this.listManagerService.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    this.listManagerService.convertIdToTitle(this.dataSource, this.karbariDictionary, 'karbariCode');
    this.listManagerService.convertIdToTitle(this.dataSource, this.qotrDictionary, 'qotrCode');

    this.listManagerService.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'counterStateCode');
    this.listManagerService.convertIdToTitle(this.dataSource, this.counterStateByCodeDictionary, 'preCounterStateCode');

    this.setDynamicRages();
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
    this._selectCols = this.listManagerService.columnLMAll();
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
  toPrePage = () => {
    if (this.isModify) {
      this.router.navigate(['/wr/m/track/offloaded']);
      return;
    }
    this._location.back();
  }
  setDynamicRages = () => {
    this.listManagerService.setDynamicPartRanges(this.dataSource);
  }
}