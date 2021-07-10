import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IListManagerPD, IListManagerPDHistory } from 'interfaces/imanage';
import { filter } from 'rxjs/internal/operators/filter';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { DateJalaliService } from 'services/date-jalali.service';
import { InteractionService } from 'services/interaction.service';
import { ListManagerService } from 'services/list-manager.service';
import { UtilsService } from 'services/utils.service';


@Component({
  selector: 'app-per-day',
  templateUrl: './per-day.component.html',
  styleUrls: ['./per-day.component.scss']
})
export class PerDayComponent implements OnInit, AfterViewInit, OnDestroy {
  trackNumber: string;
  subscription: Subscription[] = [];

  dataSource: IListManagerPD;
  offLoadPerDayHistory: IListManagerPDHistory[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];
  _selectMainDatas: any[];

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private listManagerService: ListManagerService,
    private utilsService: UtilsService,
    private router: Router,
    private route: ActivatedRoute,
    private dateJalaliService: DateJalaliService
  ) {
    this.getRouteParams();
  }

  routeToLMPDXY = (day: string) => {
    this.utilsService.routeToByParams('wr', { trackNumber: this.dataSource.trackNumber, day: day });
  }
  private insertSelectedColumns = () => {
    this._selectMainDatas = this.listManagerService.columnSelectedLMPerDayPositions();
    this._selectCols = this.listManagerService.columnSelectedLMPerDay();
    this._selectedColumns = this.listManagerService.customizeSelectedColumns(this._selectCols);
    this.dateJalaliService.sortByDate(this.offLoadPerDayHistory, 'day');
  }
  private setGetRanges = () => {
    this.dataSource.overalDuration = parseFloat(this.utilsService.getRange(this.dataSource.overalDuration));
    this.dataSource.overalDistance = parseFloat(this.utilsService.getRange(this.dataSource.overalDistance));
  }
  private setDynamicPartRanges = () => {
    this.offLoadPerDayHistory.forEach(item => {
      if (item.duration > 0)
        item.duration = parseFloat(this.utilsService.getRange(item.duration))
      if (item.distance > 0)
        item.distance = parseFloat(this.utilsService.getRange(item.distance))
    })
  }
  nullSavedSource = () => this.closeTabService.saveDataForLMPD = null;
  private classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.dataSource = await this.listManagerService.getLMPD(parseInt(this.trackNumber));
    this.offLoadPerDayHistory = this.dataSource.offLoadPerDayHistory;

    this.setGetRanges();
    this.setDynamicPartRanges();

    if (this.dataSource)
      this.insertSelectedColumns();
  }
  private getRouteParams = () => {
    this.subscription.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.trackNumber = this.route.snapshot.paramMap.get('trackNumber');
        this.classWrapper();
      })
    )
  }
  ngOnInit(): void {

  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res.includes('/wr/m/l/pd/'))
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
  toPrePage = () => this.router.navigate(['wr/m/track/reading']);

}