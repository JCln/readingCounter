import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IListManagerPD, IListManagerPDHistory } from 'src/app/Interfaces/imanage';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { ListManagerService } from 'src/app/services/list-manager.service';
import { UtilsService } from 'src/app/services/utils.service';


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
  ) {
    this.getRouteParams();
  }

  routeToLMPDXY = (day: string) => {
    this.utilsService.routeToByParams('wr', { trackNumber: this.dataSource.trackNumber, day: day });
  }
  getDataSource = (): Promise<IListManagerPD> => {
    return new Promise((resolve) => {
      this.listManagerService.getLMPD(parseInt(this.trackNumber)).subscribe(res => {
        if (res) {
          resolve(res);
        }
      })
    })
  }
  private insertSelectedColumns = () => {
    this._selectMainDatas = this.listManagerService.columnSelectedLMPerDayPositions();
    this._selectCols = this.listManagerService.columnSelectedLMPerDay();
    this._selectedColumns = this.customizeSelectedColumns();
  }
  private setGetRanges = () => {
    this.dataSource.overalDuration = parseFloat(this.utilsService.getRange(this.dataSource.overalDuration));
    this.dataSource.overalDistance = parseFloat(this.utilsService.getRange(this.dataSource.overalDistance));
    // this.dataSource.overalDuration = parseFloat(this.utilsService.getRange(this.dataSource.overalDuration));

  }
  nullSavedSource = () => this.closeTabService.saveDataForLMPD = null;
  private classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.dataSource = await this.getDataSource();
    this.offLoadPerDayHistory = this.dataSource.offLoadPerDayHistory;
    this.insertSelectedColumns();
    this.setGetRanges();
  }
  customizeSelectedColumns = () => {
    return this._selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  private getRouteParams = () => {
    this.subscription.push(this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        if (res) {
          this.trackNumber = this.route.snapshot.paramMap.get('trackNumber');
          this.classWrapper();
        }
      }
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

}