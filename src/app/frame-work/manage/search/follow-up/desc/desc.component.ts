import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { Subscription } from 'rxjs/internal/Subscription';
import { IFollowUp, IFollowUpHistory } from 'src/app/Interfaces/imanage';
import { IObjectIteratation, ISearchInOrderTo } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { TrackingManagerService } from 'src/app/services/tracking-manager.service';

@Component({
  selector: 'app-desc',
  templateUrl: './desc.component.html',
  styleUrls: ['./desc.component.scss']
})
export class DescComponent implements AfterViewInit, OnDestroy {
  trackNumber: string;
  defColumns = [
    { field: 'insertDateJalali', header: 'تاریخ ثبت' },
    { field: 'inserterCode', header: 'کد کاربر' },
    { field: 'userDisplayName', header: 'نام نمایش' },
    { field: 'counterReaderName', header: 'مامور' },
    { field: 'trackStatusTitle', header: 'وضعیت' }
    // { field: 'seen', header: 'دیده شده' },
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
  subscription: Subscription[] = [];
  dataSource: IFollowUp;
  changeHsty: IFollowUpHistory[] = [];

  constructor(
    public trackingManagerService: TrackingManagerService,
    private closeTabService: CloseTabService,
    public route: ActivatedRoute,
    private router: Router,
    private interactionService: InteractionService
  ) {
    this.getRouteParams();
  }

  toPreStatus = () => {
    this.trackingManagerService.backToConfirmDialog(this.trackNumber);
  }
  nullSavedSource = () => this.closeTabService.saveDataForFollowUp = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.dataSource = await this.trackingManagerService.getFollowUpSource(this.trackNumber);
    this.changeHsty = this.dataSource.changeHistory;
    this.closeTabService.saveDataForFollowUp = this.dataSource;
    this.insertToDesc();
  }
  getRouteParams = () => {
    this.subscription.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.trackNumber = this.route.snapshot.paramMap.get('trackNumber');
        this.classWrapper();
      })
    )
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res.includes('/wr/m/s/fwu/'))
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
  refreshTable = () => {
    this.classWrapper(true);
  }
  insertToDesc = () => {
    this._showDesc = this._descView();
  }
}