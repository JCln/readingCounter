import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { CloseTabService } from 'services/close-tab.service';

import { EN_Routes } from '../interfaces/routes.enum';

interface IAggregateInterface {
  _selectedAggregate: string,
  _canShowGroupBorder: boolean
}

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  rowGroupMetadata = {};
  _canShowGroupBorder: boolean = false;
  _selectedAggregate = '';

  constructor(
    private closeTabService: CloseTabService,
    private router: Router
  ) { }

  private latestReads = new Subject<any>();
  private netRequestSource = new BehaviorSubject<boolean>(false);
  private selectedAggregate = new BehaviorSubject<IAggregateInterface>({ _selectedAggregate: '', _canShowGroupBorder: false });

  setSelectedAgg(selectedAggregate: IAggregateInterface) {
    this.selectedAggregate.next(selectedAggregate);
  }
  get getselectedAggregate(): Observable<IAggregateInterface> {
    return this.selectedAggregate.asObservable();
  }

  getNetRequestStatus$ = (): Observable<any> => {
    return this.netRequestSource.asObservable();
  }
  setNetRequestStatus(canceled: boolean) {
    this.netRequestSource.next(canceled);
  }
  private loading(latestReads: any) {
    this.latestReads.next(latestReads);
  }
  startLoading(object: any) {
    this.loading(object);
  }
  get getMomentLatestReads(): Observable<any> {
    return this.latestReads.asObservable();
  }

  setRefresh = async (url: string) => {
    this.closeTabService.cleanData(url);
    this.router.navigateByUrl(EN_Routes.wr, { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }
}
