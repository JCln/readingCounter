import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { SnackWrapperService } from 'src/app/services/snack-wrapper.service';
import { TrackingManagerService } from 'src/app/services/tracking-manager.service';

import { IFollowUp, IFollowUpHistory } from './../../../../../Interfaces/imanage';

@Component({
  selector: 'app-desc',
  templateUrl: './desc.component.html',
  styleUrls: ['./desc.component.scss']
})
export class DescComponent implements OnInit, OnDestroy {
  trackNumber: string;
  defColumns = [
    { field: 'insertDateJalali', header: 'شماره لیست' },
    { field: 'inserterCode', header: 'تاریخ' },
    { field: 'userDisplayName', header: 'ناحیه' },
    { field: 'seen', header: 'عنوان ناحیه' },
    { field: 'counterReaderName', header: 'بازدید' },
    { field: 'trackStatusTitle', header: 'سال' },
    { field: 'hasDetails', header: 'روستایی' },
  ]


  subscription: Subscription[] = [];
  dataSource: IFollowUp;
  changeHsty: IFollowUpHistory[] = [];

  constructor(
    private trackingManagerService: TrackingManagerService,
    private closeTabService: CloseTabService,
    private route: ActivatedRoute,
    private snackWrapperService: SnackWrapperService,
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
  nullSavedSource = () => this.closeTabService.saveDataForFollowUp = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.dataSource = await this.getDataSource();
    this.changeHsty = this.dataSource.changeHistory;
    console.log(this.changeHsty);

    this.closeTabService.saveDataForTrackOffloaded = this.dataSource;
  }
  ngOnInit() {
    this.trackNumber = this.route.snapshot.paramMap.get('trackNumber');
    this.classWrapper();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
}