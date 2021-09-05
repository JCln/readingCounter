import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IFollowUp, IFollowUpHistory, IListManagerPD } from 'interfaces/imanage';
import { IObjectIteratation, ISearchInOrderTo } from 'interfaces/ioverall-config';
import { filter } from 'rxjs/internal/operators/filter';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FactoryONE } from 'src/app/classes/factory';

import { FollowUpService } from './../follow-up.service';

@Component({
  selector: 'app-desc',
  templateUrl: './desc.component.html',
  styleUrls: ['./desc.component.scss']
})
export class DescComponent extends FactoryONE {
  trackNumber: string;
  shouldActive: boolean = false;

  defColumns: IObjectIteratation[] = [
    { field: 'insertDateJalali', header: 'تاریخ ثبت', isSelected: true },
    { field: 'userDisplayName', header: 'نام کاربر', isSelected: true },
    { field: 'counterReaderName', header: 'مامور', isSelected: true },
    { field: 'trackStatusTitle', header: 'وضعیت', isSelected: true },
    { field: 'seen', header: 'دیده شده', isSelected: true, isBoolean: true },
    // { field: 'inserterCode', header: 'کد کاربر', isSelected: false },    
    // { field: 'hasDetails', header: 'جزئیات' },
  ]
  _descView = (): IObjectIteratation[] => {
    return [
      { field: 'trackNumber', header: 'شماره پیگیری ', isSelected: true, readonly: true },
      { field: 'listNumber', header: 'لیست ', isSelected: true, readonly: true },
      { field: 'zoneTitle', header: 'ناحیه ', isSelected: true, readonly: true },
      { field: 'fromEshterak', header: 'از اشتراک ', isSelected: true, readonly: true },
      { field: 'toEshterak', header: 'تا اشتراک ', isSelected: true, readonly: true },
      { field: 'fromDate', header: 'از ', isSelected: true, readonly: true },
      { field: 'toDate', header: 'تا ', isSelected: true, readonly: true },
      { field: 'overallQuantity', header: 'کل تعداد ', isSelected: true, readonly: true },
      { field: 'itemQuantity', header: 'تعداد ', isSelected: true, readonly: true },
      { field: 'readingPeriodTitle', header: 'دوره قرائت ', isSelected: true, readonly: true },
      { field: 'year', header: 'سال', isSelected: true, readonly: true }
    ];
  }

  _showDesc: IObjectIteratation[] = [];
  canShowGraph: boolean = false;
  showInOrderTo: ISearchInOrderTo[] = [
    {
      title: 'گراف',
      isSelected: true
    },
    {
      title: 'جدول',
      isSelected: false
    }
  ]
  clonedProducts: { [s: string]: IFollowUpHistory; } = {};
  subscription: Subscription[] = [];
  dataSource: IFollowUp;
  dataSourceAUX: IListManagerPD;
  changeHsty: IFollowUpHistory[] = [];
  _selectColumnsAUX: any[];

  constructor(
    public trackingManagerService: TrackingManagerService,
    private closeTabService: CloseTabService,
    public route: ActivatedRoute,
    private router: Router,
    public interactionService: InteractionService,
    private followUpService: FollowUpService,
    private authService: AuthService
  ) {
    super(interactionService);
    this.getRouteParams();
  }

  toPreStatus = (dataSource: IFollowUpHistory) => {
    this.trackingManagerService.backToConfirmDialog(dataSource.id);
  }
  nullSavedSource = () => this.closeTabService.saveDataForFollowUp = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
      this.followUpService.setData(null);
    }

    this.dataSource = await this.trackingManagerService.getDataSourceByQuote(ENInterfaces.trackingFOLLOWUP, this.trackNumber);
    this.dataSourceAUX = await this.trackingManagerService.getLMPD(this.trackNumber);

    this.followUpService.setData(this.dataSource);
    this.dataSource = this.followUpService.getData();

    this.changeHsty = this.dataSource.changeHistory;
    this.closeTabService.saveDataForFollowUp = this.dataSource;
    this.insertToDesc();
    this.trackingManagerService.setGetRanges(this.dataSourceAUX);
  }
  getRouteParams = () => {
    this.subscription.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.trackNumber = this.route.snapshot.paramMap.get('trackNumber');
        this.classWrapper();
      })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
    this.getUserRole();
  }
  insertToDesc = () => {
    this._showDesc = this._descView();
    this._selectColumnsAUX = this.trackingManagerService.columnSelectedLMPerDayPositions();
  }
  showInMap = () => {
    this.trackingManagerService.routeToLMPDXY(this.dataSource.trackNumber, this.dataSource.changeHistory[0].insertDateJalali);
  }
  routeToLMAll = (row: IFollowUpHistory) => {
    this.trackingManagerService.routeToLMAll(row);
  }
  onRowEditSave = async (dataSource: IFollowUpHistory) => {
    await this.trackingManagerService.postEditState(ENInterfaces.trackingEditState, { id: dataSource.id, seen: dataSource.seen });
  }
  onRowEditInit(dataSource: any) {
    // this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  getUserRole = (): boolean => {
    const jwtRole = this.authService.getAuthUser();
    return jwtRole.roles.includes('admin') ? true : false;
  }
  clearUNUsables = () => {
    if (!this.shouldActive) {
      const c = this.defColumns.filter(item => {
        return item.field !== 'seen'
      })
      this.defColumns = c;
      return;
    }
  }
  ngOnInit(): void {
    this.shouldActive = this.getUserRole();
    this.clearUNUsables();
  }
}