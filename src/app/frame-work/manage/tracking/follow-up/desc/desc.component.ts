import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { IFollowUp, IFollowUpHistory } from 'src/app/Interfaces/imanage';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { TrackingManagerService } from 'src/app/services/tracking-manager.service';

import { ITracking } from './../../../../../Interfaces/imanage';

@Component({
  selector: 'app-desc',
  templateUrl: './desc.component.html',
  styleUrls: ['./desc.component.scss']
})
export class DescComponent implements OnInit, AfterViewInit, OnDestroy {
  trackNumber: string;
  defColumns = [
    { field: 'insertDateJalali', header: 'تاریخ ثبت' },
    { field: 'inserterCode', header: 'کد کاربر' },
    { field: 'userDisplayName', header: 'نام نمایش' },
    { field: 'seen', header: 'دیده شده' },
    { field: 'counterReaderName', header: 'مامور قرائت' },
    { field: 'trackStatusTitle', header: 'وضعیت' },
    { field: 'hasDetails', header: 'جزئیات' },
  ]


  subscription: Subscription[] = [];
  dataSource: IFollowUp;
  changeHsty: IFollowUpHistory[] = [];

  constructor(
    private trackingManagerService: TrackingManagerService,
    private closeTabService: CloseTabService,
    private route: ActivatedRoute,
    private interactionService: InteractionService
  ) { }

  getDataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.trackingManagerService.getFollowUpSource(this.trackNumber).subscribe(res => {
          if (res) {
            resolve(res);
          }
        })
      })
    } catch {
      console.error(e => e);
    }
  }
  toPreStatus = (rowData: ITracking) => {
    this.trackingManagerService.migrateToPreState(rowData.id);
  }
  nullSavedSource = () => this.closeTabService.saveDataForFollowUp = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.dataSource = await this.getDataSource();
    this.changeHsty = this.dataSource.changeHistory;
    this.closeTabService.saveDataForFollowUp = this.dataSource;
  }
  ngOnInit() {
    this.trackNumber = this.route.snapshot.paramMap.get('trackNumber');
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res.includes('/wr/m/fwu/'))
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